#pragma strict
class EZCameraMoveToTaskFactory extends CameraTaskFactory
{
	//public var _easeType:iTween.EaseType = iTween.EaseType.easeOutExpo;
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	//public var 
	public var _move:Vector3;
	public var _time:float = 0.3;
	//public function moveOver(task:EZOverTask){
	
	//	task.over = true;
	//}
	
	
	public function create():Task{
	
	
		var task:Task = new Task();
		
		var tp:GeekTweenPosition = null;
		task.init = function(){
			var screen:Vector2 = Geek.Screen2Space(Vector3(Screen.width,Screen.height), orthographicSize_);
			var point:Vector3 = new Vector3(_move.x * screen.x, 0,  (this.target_.position.z - cameraPosition_.z) * this._move.z);
			
			tp = GeekTweenPosition.Begin(this.camera_.gameObject, _time, point);
			tp.method = _method;
			//iTween.MoveTo(this.camera_.gameObject, {"x":_move.x * screen.x, "y": 0, "z":(this.target_.position.z - cameraPosition_.z) * this._move.z, "time":_time, "islocal":true, "EaseType":_easeType,"oncompletetarget": this.gameObject,"oncomplete":"moveOver", "oncompleteparams":task});
		};
		
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		
		
		return task;
	}
}