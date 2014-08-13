#pragma strict

class EZButtonCallback extends MonoBehaviour{
	public var _box:BoxCollider;
	public var _sprite:UISprite;
	private var mode_:String = "";
	private var callback_:Function = null;
	function open(){
		if(_box != null){
			_box.enabled = true;
		}
		if(_sprite != null){
			_sprite.enabled = true;
		}
	}
	function close(){
		if(_box != null){
			_box.enabled = false;
		}
		if(_sprite != null){
			_sprite.enabled = false;
		}
	}
	public function setup(callback:Function, mode:String){
		callback_ = callback;
		mode_ = mode;
	}
	public function OnClick(){
		if(callback_){
			callback_(mode_);
		}
	}
}