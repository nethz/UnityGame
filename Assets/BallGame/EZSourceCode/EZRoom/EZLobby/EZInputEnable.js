#pragma strict

class EZInputEnable extends MonoBehaviour{
	var _box:BoxCollider = null;
	var _lable:UILabel = null;
	var _sprite:UISprite = null;
	public function open(){
		_box.enabled = true;
		_lable.enabled = true;
		_sprite.enabled = true;
	}
	public function close(){
		_box.enabled = false;
		_lable.text = "";
		_lable.enabled = false;
		_sprite.enabled = false;
	}
	public function getInput():String{
		return _lable.text;
	}
}