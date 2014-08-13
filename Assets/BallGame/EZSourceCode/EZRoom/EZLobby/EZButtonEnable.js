#pragma strict

class EZButtonEnable extends MonoBehaviour{
	var _box:BoxCollider = null;
	var _lable:UILabel = null;
	var _sprite:UISprite = null;
	var _imageButton:UIImageButton = null;
	var _button:UIButton = null;
	public function open(){
		_box.enabled = true;
		_lable.enabled = true;
		_sprite.enabled = true;
		if(_imageButton){
			_imageButton.isEnabled = false;
			_imageButton.isEnabled = true;
		}
		if(_button){
			_button.UpdateColor(true, true);
		}
	}
	public function close(){
		_box.enabled = false;
		_lable.enabled = false;
		_sprite.enabled = false;
	}
	
}