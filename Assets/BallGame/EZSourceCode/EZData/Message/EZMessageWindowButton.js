#pragma strict

class EZMessageWindowButton  extends MonoBehaviour{
	public var _button:UIButton;
	public var _text:UILabel;
	public var _sprite:UISprite;
	public var _questPress:Color;
	public var _questNormal:Color;
	public var _newsPress:Color;
	public var _newsNormal:Color;
	public var _box:BoxCollider;
	public function show(mode:EZMessageBagTable.Mode){
		setMode(mode);
		_text.enabled = true;
		_sprite.enabled = true;
	}
	
		
	public function hide(){
		_text.enabled = false;
		_sprite.enabled = false;
	}
	public function set text(value:String){
		_text.text = value;
	}
	public function setMode(mode:EZMessageBagTable.Mode){
		switch(mode){
			case EZMessageBagTable.Mode.News:
				_button.hover = _newsNormal;
				_button.pressed = _newsPress;
				_button.disabledColor = _newsNormal;
				_button.defaultColor = _newsNormal;
				
				_sprite.color = _newsNormal;
				
				break;
			case EZMessageBagTable.Mode.Quest:
				_button.hover = _questNormal;
				_button.pressed = _questPress;
				_button.disabledColor = _questNormal;
				_button.defaultColor = _questNormal;
				_sprite.color = _questNormal;
				break;
		}
	}

}