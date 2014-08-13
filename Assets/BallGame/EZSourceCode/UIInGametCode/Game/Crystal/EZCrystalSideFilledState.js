#pragma strict


class EZCrystalSideFilledState extends StateWithEventMap{

	private var sprite_:UISprite = null;
	private var color_:Color;
	private var time_:float = 0;
	private var speed_:float = 1;
	private var button_:EZCrystalWebButton = null;
	
	function EZCrystalSideFilledState(ctrl:EZCrystalSideCtrl, speed:float){
		sprite_ = ctrl._sprite;
		color_ = ctrl._filledColor;
		speed_ = speed;
		button_ = ctrl._button;
		addEvent("down", "touch");
		addEvent("web", "web");
	}
	public function start(){
		Debug.LogWarning("()()()()()()()()()()");
		time_ = 0;
		button_.filled = true;
		sprite_.color = color_;
		sprite_.enabled = true;
		sprite_.fillAmount = 1.0f;
	}
	public function over(){
	
		button_.filled = false;
		sprite_.fillAmount = 0.0f;
		Debug.LogWarning("(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)");
	}
	
	public function update(d:float){
		
		sprite_.fillAmount = 1.0f;
		//time_ += d;
		//sprite_.color.a = Mathf.PingPong(time_ * speed_, 1);
		
	}

	
	
};

