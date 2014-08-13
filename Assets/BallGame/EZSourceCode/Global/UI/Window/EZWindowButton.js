#pragma strict

class EZWindowButton extends MonoBehaviour{
	public var _box:BoxCollider;
	public var _sprite:UISprite;
	public var _label:UILabel;
	public var _button:UIImageButton;
	private var callback_:Function;
	public function set callback(value:Function){
		callback_ = value;
	}
	public function OnClick(){
		if(callback_){
			callback_();
		}
	}
	public function set label(value:String){
		_label.text = value;
	}
	public function open(enabled:boolean){
		if(enabled){
			_box.enabled = true;
			_sprite.enabled = true;
			_label.enabled = true;
			_button.enabled = true;
			_button.isEnabled = true;
		}else{
			_box.enabled = false;
			_sprite.enabled = true;
			_label.enabled = true;
			_button.enabled = true;
			_button.isEnabled = false;
		}
	}

	public function close(){
		_sprite.enabled = false;
		_label.enabled = false;
		_box.enabled = false;
		_button.enabled = false;
	}
}