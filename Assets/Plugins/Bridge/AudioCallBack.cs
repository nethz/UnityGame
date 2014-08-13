using UnityEngine;
using System.Collections;

public class AudioCallBack : MonoBehaviour{
	
	public delegate void Callback();
	public void PlaySoundWithCallback(AudioSource mAudio,AudioClip clip, Callback callback)
	{
		StopAllCoroutines();
		mAudio.clip = clip;
	    mAudio.Play();
	    StartCoroutine(DelayedCallback(clip.length, callback));
	}
	private IEnumerator DelayedCallback(float time, Callback callback)
	{	
		Debug.Log("this clip,s time is : " + time);
	    yield return new WaitForSeconds(time);
	    callback();
	}
	
}



