#pragma strict

class EZRain extends MonoBehaviour{
	
	public var _sound:EZSound;
	public var _texture:UITexture;
	private var isOpen_:boolean = false;
	private var time_:float = 0.0f;
	
	public function refresh(){
		if(isOpen_){
			_texture.enabled = true;
			_sound.play();
		}else{
			_texture.enabled = false;
			_sound.stop();
		}
	}
	public function open(){
		isOpen_ = true;
		this.refresh();
	}
	public function close(){
		isOpen_ = false;
		this.refresh();
	}
	public function Update(){
		time_ += Time.deltaTime;
		while(time_ > 5){
			time_ -= 5;
		}
		_texture.material.SetFloat("_t", time_);
	}
	public function Start(){
	
	}

	
}