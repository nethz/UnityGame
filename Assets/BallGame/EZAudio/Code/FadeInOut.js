#pragma strict

class FadeInOut extends MonoBehaviour {
	public var _inTime:float = 3f;
	public var _outTime:float = 3f;
	private var source:AudioSource = null;
	
	
	public function Awake(){
		source = this.GetComponent(AudioSource);
	}
	
	public function MusicFadeIn():GeekTweenValue{
		var maxVolume:float = DBSoundManager.Instance().maxVolume;
		return GeekTweenValue.Begin(this.gameObject,_inTime,source.volume,maxVolume,this.gameObject,"setMusicVolume");
	}
	
	public function MusicFadeOut():GeekTweenValue{
		return GeekTweenValue.Begin(this.gameObject,_outTime,source.volume,0f,this.gameObject,"setMusicVolume");
	}
	
	private function setMusicVolume(vol:float){
		source.volume = vol;
	}
}