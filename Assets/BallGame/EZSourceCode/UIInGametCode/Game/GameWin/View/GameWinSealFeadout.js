#pragma strict
class GameWinSealFeadout extends GameWinEffect{

	public var _time:float = 0.3f;
	public var _begin:Vector3 = Vector3.one;
	public var _end:Vector3 = Vector3.one;
	public var _method:GeekTweener.Method;	
	public var _waitTime:float = 0.3f;
	
	public function sealTask():Task{
		var ts:GeekTweenScale = null; 
		var task:Task = new Task();
		task.init = function(){
			this.gameObject.transform.localScale = _begin;
			ts = GeekTweenScale.Begin(this.gameObject, _time * speed_, _end);
		};
		
		task.isOver = function():boolean{
			
			if(ts && ts.enabled){
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
			ta = TweenAlpha.Begin(this.gameObject, 0.3f *speed_, 0.0f);
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
		tl.push(sealTask());
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(_waitTime * speed_);
		tl.push(wait);
		tl.push(feadoutTask());
		
		TaskManager.PushFront(tl, function(){
			TweenAlpha.Begin(this.gameObject, 0.0f, 1.0f);
		});
		return tl;
	}
}