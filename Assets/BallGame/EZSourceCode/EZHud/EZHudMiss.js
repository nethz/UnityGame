#pragma strict
class EZHudMiss extends MonoBehaviour{
	public var _label:UILabel = null;
	var _idle:boolean = true;
	private var start_:Vector3 = Vector3.zero;
	public var _end:Vector3 = Vector3.zero;
	public var _time:float = 0.5;
	public var _wait:float = 0.2;
	
	public var local_:Vector3; 
	public var _method:GeekTweener.Method = GeekTweener.Method.easeInQuart;
	
	function idle():boolean{
		return _idle;
	}
	
	public function Awake(){
		_label.enabled = false;
		local_ = this._label.gameObject.transform.localPosition;
	}
	
	
	public function showTask():Task{
		var mt:MultiTask = new MultiTask();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(_wait);
		var tl:TaskList = new TaskList();
		tl.push(wait);
		tl.push(alphaTask());
		mt.push(moveTask());
		mt.push(tl);
		TaskManager.PushFront(mt, function(){
			
			_label.effectStyle = UILabel.Effect.Outline;
			_idle = false;
			_label.enabled = true;
		
		});
		TaskManager.PushBack(mt, function(){
			_label.enabled = false;
			_idle = true; 
		});
		return mt;
	}
	
	

		
	private function moveTask():Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			this._label.gameObject.transform.localPosition = local_;
			tp = GeekTweenPosition.Begin(this._label.gameObject, _time, Vector3(local_.x, local_.y+50, local_.z-3));
			tp.method = _method;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}else{
				return true;
			}
		};
		task.shutdown = function(){
		};
	
		return task;
	}
	private function alphaTask():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			_label.color.a = 1;
			ta = TweenAlpha.Begin(this._label.gameObject, _time-_wait, 0.0f);
			
			_label.effectStyle = UILabel.Effect.None;
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}else{
				return true;
			}
		};
		task.shutdown = function(){
		};
	
		return task;
	}
};
