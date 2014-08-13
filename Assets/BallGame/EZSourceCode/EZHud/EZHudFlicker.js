#pragma strict


class EZHudFlicker extends MonoBehaviour{
	
	public var _color:UISprite;
	private var color_:Color;
	
	public function set color(value:Color){
		color_ = value;
	}
	public function brightness(bright:float){
		_color.color = color_ * (1-bright) + Color.white * bright;
	
	}
	public function flicker(){
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			color_ = _color.color;
			tv = GeekTweenValue.Begin(this.gameObject, 0.15f, 0.0f, 0.8f, this.gameObject, "brightness");
		};
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		task.shutdown = function(){
			GeekTweenValue.Begin(this.gameObject, 0.3f, 0.8f, 0.0f, this.gameObject, "brightness");
		};
		
	}
	
	
}