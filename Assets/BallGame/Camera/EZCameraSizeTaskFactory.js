#pragma strict
class EZCameraSizeTaskFactory extends CameraTaskFactory
{
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _begin:float = 600;
	public var _end:float = 900;
	public var _time:float = 0.3;
	public function setSize(size:float){
		this.camera_.orthographicSize = size;
	}
	public function create():Task{
	
	
		var task:Task = new Task();
		
		var tv:GeekTweenValue = null;
		task.init = function(){
			tv =  GeekTweenValue.Begin(this.gameObject,_time, _begin, _end, this.gameObject, "setSize");
			tv.method = _method;
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