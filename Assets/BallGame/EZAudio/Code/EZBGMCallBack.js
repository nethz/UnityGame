#pragma strict

class EZBGMCallBack extends MonoBehaviour{

	public function PlaySoundWithCallback( mAudio:AudioSource, clip:AudioClip,callback:Function){
		StopAllCoroutines();
		mAudio.clip = clip;
	    mAudio.Play();
	    StartCoroutine(DelayedCallback(clip.length, callback));
	}
	private function DelayedCallback(time:float, callback:Function):IEnumerator{	
	    yield WaitForSeconds(time);
	    callback();
	}
}