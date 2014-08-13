#pragma strict
class EZCameraSpringTaskFactory extends CameraTaskFactory
{
	//public var _easeType:iTween.EaseType = iTween.EaseType.easeOutExpo;
	public var _method1:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _method2:GeekTweener.Method = GeekTweener.Method.EaseOut;
	//public var 
	public var _move:Vector3;
	public var _time1:float = 0.3;
	public var _time2:float = 0.3;
	//public function moveOver(task:EZOverTask){
	
	//	task.over = true;
	//}
	
		

	public function create():Task{
	
		var tl:TaskList = new TaskList();
		
		
		var tp:GeekTweenPosition = null;
		
		var screen:Vector2 = Geek.Screen2Space(Vector3(Screen.width,Screen.height), orthographicSize_);
			
		var task1:Task = new Task();
		
		task1.init = function(){
			var point:Vector3 = new Vector3(_move.x * screen.x, 0,  (this.target_.position.z - cameraPosition_.z) * this._move.z);
			tp = GeekTweenPosition.Begin(this.camera_.gameObject, (_time1), point);
			tp.method = _method1;
		};
		
		task1.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		
		tl.push(task1);
		
		
		var task2:Task = new Task();
		task2.init = function(){
			
			tp = GeekTweenPosition.Begin(this.camera_.gameObject, (_time2), Vector3.zero);
			tp.method = _method2;
		};
		
		task2.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		
		tl.push(task2);
		
		return tl;
	}
}