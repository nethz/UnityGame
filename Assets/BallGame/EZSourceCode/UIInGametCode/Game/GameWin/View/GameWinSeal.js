#pragma strict

class GameWinSeal extends GameWinEffect{

	
	public var _time:float = 0.3f;
	public var _begin:Vector3 = Vector3.one;
	public var _end:Vector3 = Vector3.one;
	public var _method:GeekTweener.Method;	
	
	public function effectTask():Task{
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
}