#pragma strict

class EZCameraForward extends MonoBehaviour{
	public var _footSound:EZSound = null;
	public var _inSound:EZSound = null;
	public var _camera:Camera = null;
	public var _time:float = 0.5f;
	public var _walkStep:Vector3 = Vector3.zero;
	public var _stepNum:int = 3;
	public var _walkEnd:Vector3 = Vector3.zero;
	
	private var tp:GeekTweenPosition = null;
	private var cameraPos_:Vector3 = Vector3.zero;
	
	public function Awake(){
		cameraPos_ = _camera.transform.localPosition;
	}
	
	public function walk():Task{
		var tl:TaskList = new TaskList();
		for(var i:int = 0;i<_stepNum;++i){
			tl.push(oneStep());
		}
		return tl;
	}
	
	public function walkEndTask():Task{
		var task:Task = new Task();
		task.init = function(){
			_inSound.play();
			var odlPos:Vector3 = _camera.transform.localPosition;
			tp = GeekTweenPosition.Begin(_camera.gameObject,_time,odlPos + _walkEnd);
		};
		
		task.isOver = function():boolean{
			if(tp && !tp.enabled){
				return true;
			}
			return false;	
		};
		return task;
	}
	
	private function oneStep():Task{
		var tl:TaskList = new TaskList();
		var taskUp:Task = new Task();
		taskUp.init = function(){
			var odlPos:Vector3 = _camera.transform.localPosition;
			tp = GeekTweenPosition.Begin(_camera.gameObject,_time/(_stepNum*2),odlPos + _walkStep);
		};
		taskUp.isOver = function():boolean{
			if(tp){
				if(!tp.enabled){
					return true;
				}
				return false;
			}
			return true;
		};
		tl.push(taskUp);

		var taskDown:Task = new Task();
		taskDown.init = function(){
			var odlPos:Vector3 = _camera.transform.localPosition;
			var offset:Vector3 = new Vector3(_walkStep.x,-_walkStep.y,_walkStep.z);
			tp = GeekTweenPosition.Begin(_camera.gameObject,_time/(_stepNum*2),odlPos + offset);
		};
		taskDown.isOver = function():boolean{
			if(tp){
				if(!tp.enabled){
					return true;
				}
				return false;
			}
			return true;
		};
		tl.push(taskDown);
		
		return tl;
	}
	
	public function get stepTime():float{
		return _time;
	}
	
	
}