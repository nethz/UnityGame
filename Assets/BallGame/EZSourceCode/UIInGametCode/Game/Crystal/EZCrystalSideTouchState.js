#pragma strict


class EZCrystalSideTouchState extends StateWithEventMap{

	private var _sprite:UISprite = null;
	private var _color:Color;
	function EZCrystalSideTouchState(ctrl:EZCrystalSideCtrl){
		_sprite = ctrl._sprite;
		_color = ctrl._downColor;
		addEvent("up", "filled");
		addEvent("web", "web");
	}
	public function start(){
		
		_sprite.color = _color;
		_sprite.fillAmount = 1.0f;
	}
	public function over(){
	
		_sprite.fillAmount = 0.0f;
	}
	


	
	
};

