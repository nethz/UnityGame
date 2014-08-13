using UnityEngine;
using System;
using System.Collections;

/**
 * The MusicManager class manages multiple AudioClips through two internal AudioSources, and
 * supports fading in, fading out, playing outros, playing a list of clips in sequence, 
 * randomly playing an AudioClip from a selection of clips with the same tag,
 * and playing uncompressed layered effects at random intervals on top of compressed 
 * audio playing at the same time. It is intended to simplify use of complex interactive 
 * scores within an iPhone-hosted Unity game.
 *
 * ADDING THIS FILE
 * 
 * The MusicManager script is typically added to the MainCamera in a Scene. It may be more convenient
 * to add the LevelMusicManager subclass instead, since it makes adding clips to the manager easier.
 *
 * ADDING CLIPS
 *
 * Add AudioClips to the manager by AddAudioClip, AddOutro, or AddLayer methods. If you use the
 * AudioLevelManager, you can drag clips in the editor from the asset view and drop them into the 
 * appropriate LevelMusicManager array. If you desire custom categories of music, create your own 
 * array of clips and then invoke one of the aforementioned "Add" methods to add the clips to the manager. 
 * Any category can be added so long as it is given a unique tag.
 *
 * Adding clips by tag name creates a "sequence" of clips associated with that tag.
 *
 * PLAYING MUSIC
 * 
 * The LevelMusicManager contains convenience methods for typical Play operations. The playback behavior
 * of those methods is affected by the properties explained below. 
 *
 * -- Play(string audioTag, int clipIndex)
 *
 * In this case, a specific target clip index is passed to the manager's Play method, so the manager will play 
 * only that one specific clip, and loop or not loop it based on loop property.
 *
 * -- Play(string audioTag) or any of the LevelMusicManager Play methods:
 *
 * In this case, the boolean playSequence, playRandom, and playLoop properties affect which clip is played and how 
 * looping is interpreted as follows (note that a "sequence" refers to all clips that have the same tag name):
 *
 * WHEN playSequence == FALSE:
 * If no playSequence, yes playRandom, and no playLoop: Play one random clip from the sequence, stop after playing once.
 * If no playSequence, yes playRandom, and yes playLoop: Play a randomly-selected single clip and keep looping that one clip.
 * If no playSequence, no playRandom, and yes playLoop: Play the first clip in the sequence and loop that one clip.
 * If no playSequence, no playRandom, and no playLoop: Play the first clip in the sequence once.
 *
 * WHEN playSequence == TRUE:
 * If yes playSequence, yes playRandom, and yes playLoop: Play a random clip in the sequence, when it ends pick 
 *     another random clip in the sequence; then repeat infinitely.
 * If yes playSequence, yes playRandom, and no playLoop: Play clips in the sequence in a random order, and stop 
 *    playing when the number of plays is equal to the number of clips in the sequence.
 * If yes playSequence, yes playRandom, and no playLoop: Play the clips in order instead of randomly, and stop 
 *    playing when the last clip in the sequence has completed.
 * If yes playSequence, no playRandom and yes playLoop: Play the entire sequence in order and then loop back to 
 *    the beginning of the sequence and start it over again in the same order.
 *
 * Created: PS Neville Oct 2009
 */
public class MusicManager : MonoBehaviour 
{
	private enum AUDIO_PLAY_STATE
	{
		Stopped,
		Stopping,
		Paused,
		PlayingIntro,
		PlayingOutro,
		Playing
	};
	
	private enum AUDIO_FADE_STATE
	{
		NoFade,
		FadingIn,
		FadingOut,
		Crossfading
	};
	
	public bool playSequence = true;
	public bool playRandom = true;
	public bool playLoop = true;
	
	public bool fadeInAudio = false;
	public bool fadeOutAudio = false;
	public bool playOutros = true;
	
	public bool playLayers = true;
	public float layerVolume = 0.6F;
	public float layerProbability = 0.25F;	// Percentage chance (0 to 1.0) to play a random layer
	public float layerDelaySeconds = 20.0F;	// How many seconds to wait before checking random chance to play another layer

	public float sequenceClipDelaySeconds;	// How many seconds to wait before playing next clip (when playSequence is true)
	
	private GameObject musicHost;
	private AudioSource musicPlayer;	// plays compressed music and ambience
	private AudioSource layerPlayer;	// plays uncompressed files

	private AUDIO_PLAY_STATE playState;
	private AUDIO_FADE_STATE fadeState;
	
	private string lastTag;
	private int lastRandom;
	private int lastRandomIntro;
	private int lastRandomOutro;
	private int lastRandomLayer;
	private float masterVolume;
	private float targetVolume;
	private int clipSequenceIndex;
	private int numSequencePlays;
	
	// instead of using a single HashMap of objects, using multiple arrays
	// has a performance boost, but requires slightly more complex source:
	private string[] tags;
	private ManagedAudioClip[][] audioClips;
	private ManagedAudioClip[][] introClips;
	private ManagedAudioClip[][] outroClips;
	private ManagedAudioClip[][] layeredClips;
	
	void Awake()
	{
		musicHost = new GameObject("Music Player");
		musicHost.transform.position = new Vector3(Screen.width/2, Screen.height/2, 0);
		musicPlayer = (AudioSource) musicHost.AddComponent(typeof(AudioSource));
		masterVolume = musicPlayer.volume;
		layerPlayer = (AudioSource) musicHost.AddComponent(typeof(AudioSource));
		layerPlayer.volume = layerVolume;
		tags = new string[0];
		clipSequenceIndex = -1;
	}
	
	void Start () 
	{
	}
		
	public void AddAudioClip(AudioClip clip, string audioTag)
	{
		AddAudioClip(clip, audioTag, 1);
	}
	
	public void AddAudioClip(AudioClip clip, string audioTag, int priority)
	{
		int tagIndex = IndexForTag(audioTag);	// adds tag if it does not already exist
		ManagedAudioClip mc = new ManagedAudioClip(clip, tag, priority);
		if (audioClips == null)
		{
			// no clips exist at all
			audioClips = new ManagedAudioClip[1][];
			audioClips[tagIndex] = new ManagedAudioClip[1];
		}
		else if (audioClips.Length <= tagIndex)
		{
			// no array of clips exists yet for this tag
			ManagedAudioClip[][] tempAllClips = audioClips;
			audioClips = new ManagedAudioClip[audioClips.Length + 1][];
			tempAllClips.CopyTo(audioClips, 0);
			audioClips[tagIndex] = new ManagedAudioClip[1];
		}
		else
		{
			// array of clips already exists for tag, we're adding another clip
			ManagedAudioClip[] tempClips = audioClips[tagIndex];
			audioClips[tagIndex] = new ManagedAudioClip[tempClips.Length + 1];
			tempClips.CopyTo(audioClips[tagIndex], 0);
		}
		int n = audioClips[tagIndex].Length-1;
		audioClips[tagIndex][n] = mc;
	}
	
	public void AddOutro(AudioClip clip, string audioTag)
	{
		AddOutro(clip, audioTag, 1);
	}
	
	public void AddIntro(AudioClip clip, string audioTag, int priority)
	{
		int tagIndex = IndexForTag(audioTag);	// adds tag if it does not already exist
		ManagedAudioClip mc = new ManagedAudioClip(clip, audioTag, priority);
		if (introClips == null)
		{
			// no intros exist at all
			introClips = new ManagedAudioClip[tagIndex + 1][];
			for (int i=0; i<=tagIndex; i++)
			{
				introClips[i] = new ManagedAudioClip[1];
			}
		}
		else if (introClips.Length <= tagIndex)
		{
			// no array of intros exists yet for this tag
			ManagedAudioClip[][] tempAllClips = introClips;
			introClips = new ManagedAudioClip[introClips.Length + 1][];
			tempAllClips.CopyTo(introClips, 0);
			introClips[tagIndex] = new ManagedAudioClip[1];
		}
		else
		{
			// array of intros already exists for tag, we're adding another outro
			ManagedAudioClip[] tempClips = introClips[tagIndex];
			introClips[tagIndex] = new ManagedAudioClip[tempClips.Length + 1];
			tempClips.CopyTo(introClips[tagIndex], 0);
		}
		int n = introClips[tagIndex].Length-1;
		introClips[tagIndex][n] = mc;
	}
	
	public void AddOutro(AudioClip clip, string audioTag, int priority)
	{
		int tagIndex = IndexForTag(audioTag);	// adds tag if it does not already exist
		ManagedAudioClip mc = new ManagedAudioClip(clip, audioTag, priority);
		if (outroClips == null)
		{
			// no outros exist at all
			outroClips = new ManagedAudioClip[tagIndex + 1][];
			for (int i=0; i<=tagIndex; i++)
			{
				outroClips[i] = new ManagedAudioClip[1];
			}
		}
		else if (outroClips.Length <= tagIndex)
		{
			// no array of outros exists yet for this tag
			ManagedAudioClip[][] tempAllClips = outroClips;
			outroClips = new ManagedAudioClip[outroClips.Length + 1][];
			tempAllClips.CopyTo(outroClips, 0);
			outroClips[tagIndex] = new ManagedAudioClip[1];
		}
		else
		{
			// array of outros already exists for tag, we're adding another outro
			ManagedAudioClip[] tempClips = outroClips[tagIndex];
			outroClips[tagIndex] = new ManagedAudioClip[tempClips.Length + 1];
			tempClips.CopyTo(outroClips[tagIndex], 0);
		}
		int n = outroClips[tagIndex].Length-1;
		outroClips[tagIndex][n] = mc;
	}
	
	public void AddAudioLayer(AudioClip clip, string audioTag)
	{
		AddAudioLayer(clip, audioTag, 1);
	}
	
	public void AddAudioLayer(AudioClip clip, string audioTag, int priority)
	{
		int tagIndex = IndexForTag(audioTag);	// adds tag if it does not already exist
		ManagedAudioClip mc = new ManagedAudioClip(clip, audioTag, priority);
		mc.compressed = false;
		if (layeredClips == null)
		{
			// no layers exist at all
			layeredClips = new ManagedAudioClip[tagIndex + 1][];
			for (int i=0; i<=tagIndex; i++)
			{
				layeredClips[i] = new ManagedAudioClip[1];
			}
		}
		else if (layeredClips.Length <= tagIndex)
		{
			// no array of layers exists yet for this tag
			ManagedAudioClip[][] tempAllClips = layeredClips;
			layeredClips = new ManagedAudioClip[layeredClips.Length + 1][];
			tempAllClips.CopyTo(layeredClips, 0);
			layeredClips[tagIndex] = new ManagedAudioClip[1];
		}
		else
		{
			// array of layers already exists for tag, we're adding another layered effect
			ManagedAudioClip[] tempClips = layeredClips[tagIndex];
			layeredClips[tagIndex] = new ManagedAudioClip[tempClips.Length + 1];
			tempClips.CopyTo(layeredClips[tagIndex], 0);
		}
		int n = layeredClips[tagIndex].Length-1;
		layeredClips[tagIndex][n] = mc;
	}
	
	private int IndexForTag(string audioTag)
	{
		return IndexForTag(audioTag, true);
	}
		
	private int IndexForTag(string audioTag, bool createIfNeeded)
	{
		int n = -1;
		for (int i=0; i<tags.Length; i++)
		{
			string s = (string) tags[i];
			if (s == audioTag)
			{
				n = i;
				break;
			}
		}
		if (n == -1 && createIfNeeded)
		{
			n = AddTag(audioTag);
		}
		return n;
	}
	
	private int AddTag(string audioTag)
	{
		string[] tempTags = tags;
		tags = new string[tempTags.Length + 1];
		tempTags.CopyTo(tags, 0);
		int n = tags.Length-1;
		tags[n] = audioTag;
		return n; 
	}
	
	public AudioClip Play(string audioTag)
	{
		return Play(audioTag, -1);
	}
	
	public AudioClip Play(string audioTag, int clipIndex)
	{
		StopCoroutine("MonitorSequence");
		
		musicPlayer.Stop();
		
		if (fadeState == AUDIO_FADE_STATE.FadingIn || fadeState == AUDIO_FADE_STATE.FadingOut)
		{
			fadeState = AUDIO_FADE_STATE.NoFade;
			masterVolume = targetVolume;
		}
		
		musicPlayer.volume = masterVolume;
		
		// if looping in sequence, it is at sequence level, not clip level
		musicPlayer.loop = (playSequence) ? false : playLoop;
			
		if (NumClipsForTag(audioTag, audioClips) == 0)
		{
			playState = AUDIO_PLAY_STATE.Stopped;
			return null;
		}

		if (!playSequence && !playRandom && !playLoop && clipIndex == -1)
		{
			// play first clip once and then let it stop
			clipIndex = 0;
		}
		
		if (!playSequence || audioTag != lastTag)
		{
			// reset sequenceIndex
			clipSequenceIndex = -1;
		}
		
		ManagedAudioClip mclip = GetClipForTag(audioTag, clipIndex);		
		musicPlayer.clip = mclip.audioClip;

		if (fadeInAudio)
		{
			// NOTE: Crossfading works only when playing uncompressed intros & outros, so it's unsupported for now
			fadeState = AUDIO_FADE_STATE.FadingIn;
			StartCoroutine(FadeIn());
		}
		else
		{
			targetVolume = masterVolume; 
		}
		
		musicPlayer.Play();
		playState = AUDIO_PLAY_STATE.Playing;
		
		// if there are any random layers to play with this tag, start the coroutine to handle it
		if (NumClipsForTag(audioTag, layeredClips) > 1)
		{
			StartCoroutine(PlayLayers(audioTag));
		}
		
		if (playSequence)
		{
			StartCoroutine(MonitorSequence(audioTag));
		}
		
		lastTag = audioTag;
		return mclip.audioClip;
	}
	
	public void Pause()
    {
    	musicPlayer.Pause();
		playState = AUDIO_PLAY_STATE.Paused;
    }

	public void Stop()
    {
    	if (!musicPlayer.isPlaying || playState == AUDIO_PLAY_STATE.PlayingOutro) return;
    	
    	StopCoroutine("MonitorSequence");
    	numSequencePlays = 0;
    	
    	if (fadeOutAudio)
    	{
    		if (fadeState == AUDIO_FADE_STATE.FadingOut && playState == AUDIO_PLAY_STATE.Stopping)
    		{
    			// coroutine already in progress, let it exit and reset volume
    			playState = AUDIO_PLAY_STATE.Stopped;
    		}
    		else
    		{
    			fadeState = AUDIO_FADE_STATE.FadingOut;
    			playState = AUDIO_PLAY_STATE.Stopping;
				StartCoroutine(FadeOut());
    		}
		}
    	else
    	{
    		fadeState = AUDIO_FADE_STATE.NoFade;
    		if (playOutros && NumClipsForTag(lastTag, outroClips) > 0)
    		{
    			StartCoroutine(PlayOutro(lastTag));
    		}
    		else
    		{
    			musicPlayer.Stop();
    			playState = AUDIO_PLAY_STATE.Stopped;
    		}
    	}
    }
    
    IEnumerator FixLoop(AudioClip c)
	{
		// this is a hack to work around Unity's problem with looping compressed audio
		// on the iPhone -- seems very unreliable, however, as the hiccup time may 
		// vary by device, and this should be fixed by Unity
		while(playLoop && playState == AUDIO_PLAY_STATE.Playing)
		{
			yield return new WaitForSeconds(c.length - 0.12F);
			musicPlayer.Play();
		}
	}

	IEnumerator MonitorSequence(string audioTag)
	{
		int origClipID = musicPlayer.clip.GetInstanceID();
		
		float waitSecs = musicPlayer.clip.length;
		if (fadeOutAudio) waitSecs -= 5.0F; // account for fadeOut time
		if (waitSecs <= 0) waitSecs = 1.0F;
		
		yield return new WaitForSeconds(waitSecs);	
		
		if (musicPlayer.clip.GetInstanceID() == origClipID && playSequence && playState == AUDIO_PLAY_STATE.Playing)
		{			
			// if the audio tag has changed, reset the sequence index
			// (this shoud not happen, as the coroutine is stopped  
			// if/when the tag changes, but just in case):
			if (audioTag != lastTag)
			{
				clipSequenceIndex = 0;
			}
			
			numSequencePlays++;
			int numClips = NumClipsForTag(audioTag, audioClips);
			if ((playLoop) || (playRandom && numClips > numSequencePlays) || (!playRandom && (numClips-1) > clipSequenceIndex))
			{
				if (fadeOutAudio)
				{
					fadeState = AUDIO_FADE_STATE.FadingOut;
	    			playState = AUDIO_PLAY_STATE.Stopping;
					StartCoroutine(FadeOut());
					do 
					{
						yield return new WaitForSeconds(1.0f);
					}
					while (playState != AUDIO_PLAY_STATE.Stopped);
				}
				
				if (sequenceClipDelaySeconds > 0)
				{
					// configured to add some silence between clips in a sequence
					yield return new WaitForSeconds(sequenceClipDelaySeconds);
				}

				Play(lastTag);		// this will restart the sequence coroutine if it is still enabled
			}
			else 
			{
				// reached the end of a sequence that should not be looped, play the potential outro
				clipSequenceIndex = -1;
				Stop();
			}
		}
	}
	
    IEnumerator PlayLayers(string audioTag)
	{
		yield return new WaitForSeconds(layerDelaySeconds);	// don't fire one right away

		while (lastTag == audioTag 
			&& playState == AUDIO_PLAY_STATE.Playing 
			&& fadeState == AUDIO_FADE_STATE.NoFade)
		{
			float secs = layerDelaySeconds;
			if (playLayers)
			{
				int n = UnityEngine.Random.Range(0, 100);
				if (n <= (layerProbability * 100))
				{
					ManagedAudioClip mc = GetLayerForTag(audioTag);
					layerPlayer.clip = mc.audioClip;
					layerPlayer.loop = false;
					layerPlayer.volume = layerVolume;
					layerPlayer.Play();
					secs = layerDelaySeconds + layerPlayer.clip.length;
				}
			}
			yield return new WaitForSeconds(secs);
		}
	}
		
    IEnumerator PlayIntro(string audioTag)
	{
		ManagedAudioClip mc = GetIntroForTag(audioTag);
		musicPlayer.clip = mc.audioClip;
		bool originalLoop = playLoop;		
		musicPlayer.loop = false;
		musicPlayer.Play();
		playState = AUDIO_PLAY_STATE.PlayingIntro;
		yield return new WaitForSeconds(musicPlayer.clip.length);
		if (playState == AUDIO_PLAY_STATE.PlayingIntro)
		{
			// play original target file
			ManagedAudioClip mclip = GetClipForTag(audioTag, -1);
			musicPlayer.clip = mclip.audioClip;
			musicPlayer.Play();
			playState = AUDIO_PLAY_STATE.Playing;
		}
		musicPlayer.loop = originalLoop;
	}
		
    IEnumerator PlayOutro(string audioTag)
	{
		ManagedAudioClip mc = GetOutroForTag(audioTag);
		playState = AUDIO_PLAY_STATE.PlayingOutro;
		musicPlayer.clip = mc.audioClip;
		bool originalLoop = playLoop;		
		musicPlayer.loop = false;
		musicPlayer.Play();
		yield return new WaitForSeconds(musicPlayer.clip.length);
		if (playState == AUDIO_PLAY_STATE.PlayingOutro)
		{
			musicPlayer.Stop();
			playState = AUDIO_PLAY_STATE.Stopped;
		}
		musicPlayer.loop = originalLoop;
	}
	
	IEnumerator FadeIn()
	{
		targetVolume = masterVolume;
		musicPlayer.volume = 0;
		do 
		{
			musicPlayer.volume = musicPlayer.volume + 0.01F;
			yield return new WaitForSeconds(0.2F);
		} 
		while (musicPlayer.volume < targetVolume 
			&& (fadeState == AUDIO_FADE_STATE.FadingIn || fadeState == AUDIO_FADE_STATE.Crossfading) 
			&& (playState == AUDIO_PLAY_STATE.Playing || playState == AUDIO_PLAY_STATE.PlayingIntro));
		if (fadeState == AUDIO_FADE_STATE.FadingIn)
		{
			fadeState = AUDIO_FADE_STATE.NoFade;
			musicPlayer.volume = targetVolume;
		}
	}
	
	IEnumerator FadeOut()
	{
		float originalVolume = targetVolume; //masterVolume;
		do 
		{
			musicPlayer.volume = musicPlayer.volume - 0.02F;
			yield return new WaitForSeconds(0.1F);	// fades out faster than it fades in, which is typically desirable
		} 
		while (musicPlayer.volume > 0.0F 
			&& (fadeState == AUDIO_FADE_STATE.FadingOut || fadeState == AUDIO_FADE_STATE.Crossfading)
			&& (playState == AUDIO_PLAY_STATE.Stopping || playState == AUDIO_PLAY_STATE.PlayingOutro));
		if (fadeState == AUDIO_FADE_STATE.FadingOut)
		{
			fadeState = AUDIO_FADE_STATE.NoFade;
			musicPlayer.Stop();
			playState = AUDIO_PLAY_STATE.Stopped;
			musicPlayer.volume = originalVolume;
		}
	}
	    
    private int NumClipsForTag(string audioTag, ManagedAudioClip[][] clipArray)
	{
		int n = 0;
		try
		{
			int tagIndex = IndexForTag(audioTag, false);
			if (tagIndex != -1 && clipArray != null && clipArray.Length > tagIndex
				&& ((ManagedAudioClip) clipArray[tagIndex][0]).audioClip != null)
			{
				n = clipArray[tagIndex].Length;
			}
		}
		catch (Exception)
		{}
		return n;
	}
	
    private ManagedAudioClip GetIntroForTag(string audioTag)
	{
		// intros and outros are always randomized -- if you desire a specific intro,
		// then either add only one intro clip to the manager, or add the intro clip
		// as an audio clip instead of as an intro and play it once, or bake it into the 
		// main audio clip file 
		
		// juxtapose lastRandom and lastRandomIntro since we're selecting an intro clip
		int tempRand = lastRandom;
		lastRandom = lastRandomIntro;

		ManagedAudioClip mc = GetClipFromArray(audioTag, introClips, -1, true);
		
		lastRandomIntro = lastRandom;	// set by above method
		lastRandom = tempRand;			// restore random to avoid it being set by layer selection
		
		return mc;
	}
	
    private ManagedAudioClip GetOutroForTag(string audioTag)
	{
		// intros and outros are always randomized -- if you desire a specific outro,
		// then either add only one outro clip to the manager, or add the outro clip
		// as an audio clip instead of as an outro and play it once, or bake it into the 
		// main audio clip file 
		
		// juxtapose lastRandom and lastRandomIntro since we're selecting an intro clip
		int tempRand = lastRandom;
		lastRandom = lastRandomOutro;
		
		ManagedAudioClip mc = GetClipFromArray(audioTag, outroClips, -1, true);
		
		lastRandomOutro = lastRandom;	// set by above method
		lastRandom = tempRand;			// restore random to avoid it being set by layer selection
		
		return mc;
	}
	
	private ManagedAudioClip GetLayerForTag(string audioTag)
	{
		// layers are always random
		
		// juxtapose lastRandom and lastRandomLayer since we're selecting a layer clip here
		int tempRand = lastRandom;
		lastRandom = lastRandomLayer;
		
		ManagedAudioClip layerClip = GetClipFromArray(audioTag, layeredClips, -1, true);
			
		lastRandomLayer = lastRandom;	// set by above method
		lastRandom = tempRand;			// restore random to avoid it being set by layer selection
		return layerClip;
	}
	
	private ManagedAudioClip GetClipForTag(string audioTag, int clipIndex)
	{
		return GetClipFromArray(audioTag, audioClips, clipIndex, false);
	}
	
	private ManagedAudioClip GetClipFromArray(string audioTag, ManagedAudioClip[][] clipArray, int clipIndex, bool forceRandom)
	{
		ManagedAudioClip mc = null;
		int tagIndex = IndexForTag(audioTag, false);
		if (tagIndex != -1 && clipArray.Length > tagIndex)
		{
			ManagedAudioClip[] clipsForTag = clipArray[tagIndex];
			if (clipsForTag.Length > 0)
			{
				if (clipIndex == -1)
				{
					if (playRandom || forceRandom)
					{
						// choose randomly from list
						int n = UnityEngine.Random.Range(0, clipsForTag.Length);
						if (lastRandom == n && lastTag == audioTag)
						{
							// ensure selection changes
							n = (n > 0) ? n - 1 : clipsForTag.Length - 1;
						}
						lastRandom = n;
						mc = (ManagedAudioClip) clipsForTag[n];
					}
					else
					{
						// choose next clip in the sequence
						// if looping, revert to beginning upon reaching end
						++clipSequenceIndex;
						if (playLoop && (clipsForTag.Length <= clipSequenceIndex))
						{
							clipSequenceIndex = 0;
						}
						mc = (ManagedAudioClip) clipsForTag[clipSequenceIndex];
					}
				}
				else
				{
					// retrieve a specific clip at the specified index
					if (clipsForTag.Length > clipIndex)
					{
						mc = (ManagedAudioClip) clipsForTag[clipIndex];
					}
				}
			}
		}
		return mc;
	}
     
   /* PROPERTIES TO INSPECT PLAYBACK STATE */
	
	public bool audioPlaying
	{
		get 
		{ 
			return (musicPlayer.isPlaying 
				&& playState != AUDIO_PLAY_STATE.Stopped 
				&& playState != AUDIO_PLAY_STATE.Paused);
		}
	}
	
	public bool mainAudioPlaying
	{
		get
		{
			return audioPlaying && !introPlaying && !outroPlaying && !fadingIn && !fadingOut;
		}
	}
	
	public bool introPlaying
	{
		get { return playState == AUDIO_PLAY_STATE.PlayingIntro; }
	}
	
	public bool outroPlaying
	{
		get { return playState == AUDIO_PLAY_STATE.PlayingOutro; }
	}
	
	public bool fadingIn
	{
		get { return fadeState == AUDIO_FADE_STATE.FadingIn; }
	}

	public bool fadingOut
	{
		get { return fadeState == AUDIO_FADE_STATE.FadingOut; }
	}
	
	public bool isLayerPlaying
	{
		get { return layerPlayer.isPlaying; }
	}
	
	public string clipName
	{
		get { return musicPlayer.clip.name; }
	}
	
	public string layerClipName
	{
		get { return layerPlayer.clip.name; }
	}
	
	/* PROPERTIES TO MANIPULATE PLAYBACK */
    
    public float volume
    {
    	get { return musicPlayer.volume; }
    	set { musicPlayer.volume = masterVolume = value; }
    }

    public float pitch
    {
    	/* PITCH CHANGES WILL AFFECT ONLY UNCOMPRESSED (LAYERED) SOUNDS */
    	get { return musicPlayer.pitch; }
    	set { musicPlayer.pitch = value; }
    }
    
    public float time
    {
    	get { return musicPlayer.time; }
    	set { musicPlayer.time = value; }
    }
    
    public string audioTag
    {
    	get { return lastTag; }
    	set { lastTag = value; }
    }         
}

public class ManagedAudioClip : Component
{
	public AudioClip audioClip;
	public string audioTag;
	public float priority;
	public bool compressed = true;	// assumes background music or ambience
	
	public ManagedAudioClip()
	{}
	
	public ManagedAudioClip(AudioClip c, string t, int p)
	{
		audioClip = c;
		audioTag = t;
		priority = (p > 0) ? p : 1.0F;
	}
}