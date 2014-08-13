#pragma strict

class GameWinNumber extends GameWinEffect{

	
	public var _time:float = 0.5f;
	public var _begin:float = 0.0f;
	public var _end:float =  0.0f;
	public var _text:UILabel;
	public function set number(value:float){
		_end = value;
	}
	public function setNumber(number:float){
		_text.text = (Mathf.FloorToInt(number)).ToString();
	}
	
	public function effectTask():Task{
		var tv:GeekTweenValue = null;
	
		var task:Task = new Task();
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject, _time* speed_, _begin, _end, this.gameObject, "setNumber");
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