#pragma strict
/*
class EZDuplicateInState extends StateWithEventMap{
	
	private var ctrl_:EZDuplicateCtrl = null;
	private var nextState_:String;
	private var task_:Task = null;
	private var isOver_:boolean = false;
	private var callback_:Function = null;
	public function EZDuplicateInState(ctrl:EZDuplicateCtrl, nextState:String){
		this.ctrl_ = ctrl;
		this.nextState_ = nextState;
		callback_ = function(){};
	}
	
	
	public function EZDuplicateInState(ctrl:EZDuplicateCtrl, nextState:String, callback:Function){
		this.ctrl_ = ctrl;
		this.nextState_ = nextState;
		this.callback_ = callback;
	}
	public function start(){
		isOver_ = false;
		ctrl_.inputClose();
		task_ = ctrl_.flyTask(callback_);
		TaskManager.PushBack(task_, function(){isOver_ = true;});
		TaskManager.Run(task_);
		
	}
	public function update(d:float){
		if(isOver_){
			Debug.Log("EEEFF");
			return nextState_;
		}
		
		return "";
	}
	public function over(){
		ctrl_.inputOpen();
	}
	
}*/