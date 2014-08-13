#pragma strict


class EZCrystalSideWebState extends StateWithEventMap{

	private var _sprite:UISprite = null;
	private var _color:Color;
	private var _time:float = 0;
	private var _speed:float = 1;
	private var _sound:EZSound = null;
	
	private var ctrl_:EZCrystalSideCtrl;
	function EZCrystalSideWebState(ctrl:EZCrystalSideCtrl, speed:float){
		
		ctrl_ = ctrl;
		_sprite = ctrl._sprite;
		_color = ctrl._webColor;
		_sound = ctrl._sound;
		
		addEvent("reset", "normal");
		_speed = speed;
		_time = 0;
	}
	
	public function update(d:float){
		_time += d;
		
		_sprite.fillDirection = UISprite.FillDirection.Radial360;
		var r:float = _time*_speed;
		var n:int = Mathf.FloorToInt(r);
		if(n%2 == 0){
			_sprite.invert = true;
			_sprite.fillAmount = r - n;
		}else{
			_sprite.invert = false;
			_sprite.fillAmount =  1.0f- (r - n);
		}
	}
	public function start(){
		Debug.LogWarning("EZCrystalSideWebState");
		Debug.Log("in web");
		_sprite.color = _color;
		_sprite.fillAmount = 1.0f;
		_sound.play();
	}
	
	public function over(){
		ctrl_.filled = false;
		Debug.Log("out web");
		_sprite.fillAmount = 0.0f;
	}
	


	
	
};

