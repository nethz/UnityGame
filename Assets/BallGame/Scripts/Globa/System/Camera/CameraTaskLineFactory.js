#pragma strict

class CameraTaskLineFactory extends CameraTaskFactory
{
	public var _objective:Vector3;
	public var _allTime:float; 

	public function create():Task{
		var task = new Task();
		var time:float = 0; 
		var begin:Vector3;
		var end:Vector3; 
		var cam:Camera;
		task.init = function(){   
			time = 0; 
			cam = this.camera_; 
			var size:Vector2 = Geek.Screen2Space(Vector2(Screen.width, Screen.height), orthographicSize_);
			begin = cam.transform.localPosition; 
			Debug.LogWarning(this.cameraPosition_); 
			Debug.LogWarning(this.target_.position.z); 
			
			var length:float =  this.target_.position.z - this.cameraPosition_.z;
			
			end =  Vector3(_objective.x * size.x, _objective.y * size.y, _objective.z * length);
		};
		task.update = function(d:float){
			time += d;
			var r:float = time/_allTime;
			cam.transform.localPosition = begin*(1-r) + end*r;
		};
		task.shutdown = function(){
			cam.transform.localPosition = end;
		};
		
		task.isOver = function(){
			if(time > _allTime){
				return true;
			}
			return false;
		};
		return task;
	}
}