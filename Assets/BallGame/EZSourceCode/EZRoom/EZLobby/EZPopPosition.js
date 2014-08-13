#pragma strict

class EZPopPosition extends MonoBehaviour{
	
	public var _camera:Camera = null; 
	public var _autoTurn:boolean = true;
	
	public var _offset:Vector3 = Vector3.zero;
	public var _pop:EZPop = null;
	public var _onClick:boolean = false;
	public var _debug:boolean = false;
	public var _tip:boolean = false;
	private var onTip_:boolean = false;
	//private var _isTip:boolean = false;
	private var tipMessage_:String = "cry";
	public function set tipMessage(value:String){
		tipMessage_ = value;
		if(_tip && onTip_){
			var tl:TaskList = new TaskList();
			tl.push(hideTask());
			tl.push(showTask(tipMessage_));
			TaskManager.Run(tl);
		}
	}
	public function Start(){
		if(_debug){
			var tl:TaskList = new TaskList();
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(1.0f);
			tl.push(wait);
			tl.push(showTask("assdfsdfsdfsdf"));
			TaskManager.Run(tl);
		
		}
	}
	public function OnPress(press:boolean){
		if(_tip && !String.IsNullOrEmpty(tipMessage_)){
			if(press){
				onTip_ = true;
				TaskManager.Run(showTask(tipMessage_));
			}else{
				onTip_ = false;
				TaskManager.Run(hideTask());
			}
		}
		
		
	}
	public function OnDrag(){
		if(_tip && !String.IsNullOrEmpty(tipMessage_)){
			TaskManager.Run(hideTask());
			onTip_ = false;
		}
		
	}
	public function OnRelease(){
		//	TaskManager.Run(hideTask());
		
	}
	public function OnClick(){
		if(_onClick){
			if(_pop!=null){
				TaskManager.Run(_pop.hideTask());
			}else{
				TaskManager.Run(EZPopInstance.GetInstance().hideTask());
			}
			
		}
	
	}
	public function hideTask():Task{
		if(_pop!=null){
			return _pop.hideTask();
		}else{
			return EZPopInstance.GetInstance().hideTask();
		}
	}
	public function showTask(text:String):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		
		task.init = function(){
			var show:Task = null;
			
			if(_pop){
				_pop.setPosition(this._camera, this.gameObject,  _offset, _autoTurn);
				show = _pop.showTask(text);
			}else{
				EZPopInstance.GetInstance().setPosition(this._camera, this.gameObject,  _offset, _autoTurn);
				show = EZPopInstance.GetInstance().showTask(text);
			}
			
			TaskManager.PushBack(show, function(){
				isOver = true;
			});
			TaskManager.Run(show);
		
		};
		
		task.isOver = function():boolean{
			return isOver;	
		};
		
		return task;
	
	}

}