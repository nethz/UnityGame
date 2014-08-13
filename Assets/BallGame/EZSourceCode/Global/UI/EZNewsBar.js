#pragma strict

class EZNewsBar extends MonoBehaviour{
	public var _info:EZInfo;
	public var _sprite:UISprite;
	
	public function addText(text:String){
		_info.addText(text);
	}
	
	
	
	public function hide(){
		_info.hide();
		_sprite.enabled = false;
	}
	
	
	public function show(){
		_sprite.enabled = true;
		_info.show();
	}
	
}