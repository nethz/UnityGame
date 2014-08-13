#pragma strict

class EZSound extends MonoBehaviour{
	public var _handler:AudioSource = null;
	private var _open:boolean = false;
	private var enabled_:boolean = false;
	
	public function get handler():AudioSource{
		return _handler;
	}
	public function play(){
		_open = true;
		refresh();
	
	}
	public function stop(){
		_open = false;
		refresh();
	}
	public function refresh(){
		if(enabled_){
			_handler.enabled = true;
			if(_open){
				_handler.Play();
			}else{
				_handler.Stop();
			}
		}else{
			_handler.enabled = false;
		}
	}
	public function Start(){
		var data:JsonData.SoundSetup = EZSoundManager.GetInstance().setup;
		enabled_ = data.sound;
	
		refresh();
	}
	
	
}