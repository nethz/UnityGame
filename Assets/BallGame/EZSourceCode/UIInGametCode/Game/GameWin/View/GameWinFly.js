#pragma strict

class GameWinFly extends GameWinEffect{
	public var _target:Vector3;
	public var _time:float = 0.3f;
	
	public var _method:GeekTweener.Method;	
	public var _feadout:boolean = true;
	
	public function get target():Vector3{
		return _target;
	}
	public function set target(value:Vector3){
		_target = value;
	}
	
	public function flyTask():Task{
		var tp:GeekTweenPosition = null;
		
		var task:Task = new Task();
		task.init = function(){
			tp = GeekTweenPosition.Begin(this.gameObject, _time * speed_, _target);
			tp.method = _method;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	public function feadoutTask():Task{
		var ta:TweenAlpha = null;
		var task:Task = new Task();
		task.init = function(){
			ta = TweenAlpha.Begin(this.gameObject, 0.1f *speed_, 0.0f);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	
	public function effectTask():Task{
	
		var tl:TaskList = new TaskList();
		tl.push(this.flyTask());
		if(_feadout){
			tl.push(this.feadoutTask());
		}
		
		
		return tl;
	}
}