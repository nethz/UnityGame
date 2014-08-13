#pragma strict

class GameWinRock extends GameWinEffect{
	public var _sprite:UISprite;
	public var _time:float = 0.5f;
	public var _begin:float = 0.0f;
	public var _end:float =  1.0f;
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public function set begin(value:float){
		_begin = value;
	}
	public function set end(value:float){
		_end = value;
	}
	public function setNumber(number:float){
		_sprite.fillAmount = number;
	}
	
	public function effectTask():Task{
		var tv:GeekTweenValue = null;
	
		var task:Task = new Task();
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject,_time * speed_, _begin, _end, this.gameObject, "setNumber");
			tv.method = this._method;
		};
		
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		
		return task;
		
	}
}