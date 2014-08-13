using UnityEngine;
using System.Collections;

/*
 * LevelMusicManager extends MusicManager to provide typical categories of tagged music.
 * This class would usually be attached to a camera object. Adding additional custom
 * categories of music ("boss theme" or "danger music" for example) is possible by using 
 * the MusicManager API's of this subclass directly.
 * 
 * For explanation of the various properties that affect playback behavior, see the 
 * comments in the MusicManager class definition.
 *
 * Created: PS Neville Oct 2009
 */
public class LevelMusicManager : MusicManager
{
	public AudioClip[] menuMusic;
	
	public AudioClip[] actionMusic;
	public AudioClip[] actionMusicOutros;

	public AudioClip[] victoryMusic;
	public AudioClip[] defeatMusic;
	
	public AudioClip[] ambientSound;
	public AudioClip[] layeredMusicClips;	// uncompressed, short clips played at random intervals on top of ambience
	
	public static string TAG_MENU = "theme";
	public static string TAG_ACTION = "action";
	public static string TAG_VICTORY = "victory";
	public static string TAG_DEFEAT = "defeat";
	public  const string TAG_AMBIENT = "ambience";
	
	void Start()
	{
		InitInternalArrays();
		PlayDefeatMusic(2);
	}
	
	public AudioClip PlayMenuMusic()
	{
		return Play(TAG_MENU);
	}
	
	public AudioClip PlayActionMusic()
	{
		return Play(TAG_ACTION);
	}
	
	public AudioClip PlayActionMusic(int clipIndex)
	{
		return Play(TAG_ACTION, clipIndex);	
	}
		
	public AudioClip PlayAmbientSound()
	{
		return PlayAmbientSound(-1);
	}
	
	public AudioClip PlayAmbientSound(int clipIndex)
	{
		return Play(TAG_AMBIENT, clipIndex);
	}

	public AudioClip PlayDefeatMusic()
	{
		return PlayDefeatMusic(-1);
	}
	
	public AudioClip PlayDefeatMusic(int clipIndex)
	{
		bool tempLoop = playLoop;
		bool tempPlayOutros = playOutros;
		bool tempFadeInAudio = fadeInAudio;
		bool tempFadeOutAudio = fadeOutAudio;
		bool tempSequence = playSequence;
		
		playLoop = false;
		playOutros = false;
		fadeInAudio = false;
		fadeOutAudio = false;
		playSequence = false;
		
		AudioClip ac = Play(TAG_DEFEAT);
		
		playLoop = tempLoop;
		playOutros = tempPlayOutros;
		fadeInAudio = tempFadeInAudio;
		fadeOutAudio = tempFadeOutAudio;
		playSequence = tempSequence;
		
		return ac;
	}
	
	public AudioClip PlayVictoryMusic()
	{
		return PlayVictoryMusic(-1);
	}
	
	public AudioClip PlayVictoryMusic(int clipIndex)
	{
		bool tempLoop = playLoop;
		bool tempPlayOutros = playOutros;
		bool tempFadeInAudio = fadeInAudio;
		bool tempFadeOutAudio = fadeOutAudio;
		bool tempSequence = playSequence;
		
		playLoop = false;
		playOutros = false;
		fadeInAudio = false;
		fadeOutAudio = false;
		playSequence = false;
		
		AudioClip ac = Play(TAG_VICTORY);
		
		playLoop = tempLoop;
		playOutros = tempPlayOutros;
		fadeInAudio = tempFadeInAudio;
		fadeOutAudio = tempFadeOutAudio;
		playSequence = tempSequence;
		
		return ac;
	}
	
	private void InitInternalArrays()
	{
		// assume the AudioClip[] member arrays were populated in the editor
		for (int i=0; i<menuMusic.Length; i++)
		{
			AddAudioClip(menuMusic[i], TAG_MENU);
		}
		for (int i=0; i<ambientSound.Length; i++)
		{
			AddAudioClip(ambientSound[i], TAG_AMBIENT);
		}
		for (int i=0; i<actionMusic.Length; i++)
		{
			AddAudioClip(actionMusic[i], TAG_ACTION);
		}
		for (int i=0; i<victoryMusic.Length; i++)
		{
			AddAudioClip(victoryMusic[i], TAG_VICTORY);
		}
		for (int i=0; i<defeatMusic.Length; i++)
		{
			AddAudioClip(defeatMusic[i], TAG_DEFEAT);
		}
		for (int i=0; i<actionMusicOutros.Length; i++)
		{
			// using the "action" tag means these outros will only be played when
			// a main clip with the "action.orch" tag is playing
			AddOutro(actionMusicOutros[i], TAG_ACTION);
		}
		for (int i=0; i<layeredMusicClips.Length; i++)
		{
			// using the "ambience" tag means these random clips will play only when 
			// a main clip with the "ambience" tag is playing
			AddAudioLayer(layeredMusicClips[i], TAG_AMBIENT);
		}
	}
}
