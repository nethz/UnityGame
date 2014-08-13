using UnityEngine;
using System.Collections;

public class AudioTest : MonoBehaviour
{
	public AudioSource music1 = null;
	public AudioSource music2 = null;
	public float musicVolume = 0.5f;
	
	
	// Use this for initialization
	void Start ()
	{
		musicVolume = 0.5f;
		DontDestroyOnLoad(this);////
	}
	
	// Update is called once per frame
	void Update ()
	{
	}
	
	void OnGUI ()
	{
		if (GUI.Button (new Rect (10, 10, 100, 50), "Play music")) {
			if (!music1.isPlaying) {
				music1.Play ();
			}
		}
		
		if (GUI.Button (new Rect (10, 60, 100, 50), "Stop music")) {
			if (music1.isPlaying) {
				music1.Stop ();
			}
			if (music2.isPlaying) {
				music2.Stop ();
			}
		}
		
		if (GUI.Button (new Rect (10,110,100,50),"Pause music")){
			if(music1.isPlaying){
				music1.Pause ();
			}
			if(music2.isPlaying){
				music2.Pause ();
			}
		}
		
		musicVolume = GUI.HorizontalSlider (new Rect(160,10,100,50),musicVolume,0.0f,1.0f);
		GUI.Label (new Rect(160,50,300,20),"Music Volume is " + (musicVolume*100) + "%");
		if(music1.isPlaying || music2.isPlaying){
			music1.volume = musicVolume;
			music2.volume = musicVolume;
		}
		
		
		if (GUI.Button (new Rect (10,160,100,50),"next music")){
			if(music1.isPlaying){
				music1.Stop ();
				music2.Play ();
			}else if(music2.isPlaying){
				music2.Stop ();
				music1.Play ();
			}
		}
		
	}	
}
