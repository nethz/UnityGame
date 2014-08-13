#pragma strict
/*
class EZCurtain extends MonoBehaviour{
	public var _alpha:float = 1;
	public var _black:UISprite = null;
	public function show(time:float):Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			this.gameObject.SetActive(true);
			ta = TweenAlpha.Begin(this.gameObject, time, _alpha);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false; 
			}
			return true;
		};
		return task;
	}
	
	public function hide(time:float):Task{

		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			ta = TweenAlpha.Begin(this.gameObject, time, 0);
		};
		task.shutdown = function(){
			this.gameObject.SetActive(false);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false; 
			}
			return true;
		};		
		
		return task;
		
	}

}*/
