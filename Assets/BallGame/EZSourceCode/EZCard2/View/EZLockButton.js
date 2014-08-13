#pragma strict

class EZLockButton extends MonoBehaviour{
	enum State{
		Enabled,
		Disabled,
		Locked,
	}
	private var state_:State = State.Enabled;
	public var _image:UIImageButton = null;
	public var _lock:String = "";
	public var _sprite:UISprite = null;
	public var _box:BoxCollider = null;
	public var _box2:BoxCollider = null;
	
	public function doEnable(){
		state_ = State.Enabled;
		refresh();
	}
	public function doDisable(){
		
		state_ = State.Disabled;
		refresh();
	}
	public function doLock(){
		state_ = State.Locked;
		refresh();
	}
	private function refresh(){
		if(state_ == State.Locked){
			_box2.enabled = true;
			_image.enabled = false;
			_sprite.spriteName = _lock;
			_box.enabled = false;
		}else if(state_ == State.Enabled){
			_box2.enabled = false;
			_image.isEnabled = true;
		}else if(state_ == State.Disabled){
			_box2.enabled = false;
			_image.isEnabled = false;
		}
	}

}