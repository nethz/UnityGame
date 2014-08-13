#pragma strict
/*
class EZDuplicateEventInState extends StateWithEventMap{
	
	private var ctrl_:EZDuplicateCtrl = null;
	private var task_:Task = null;
	private var isOver_:boolean = false;
	private var callback_:Function = null;
	public function EZDuplicateEventInState(ctrl:EZDuplicateCtrl){
		this.ctrl_ = ctrl;
		callback_ = function(){};
	}
	
	
	public function EZDuplicateEventInState(ctrl:EZDuplicateCtrl,callback:Function){
		this.ctrl_ = ctrl;
		this.callback_ = callback;
	}
	public function start(){
		isOver_ = false;
		ctrl_.inputClose();
		task_ = ctrl_.flyEventTask(callback_);
		TaskManager.PushBack(task_, function(){isOver_ = true;});
		TaskManager.Run(task_);
		
	}
	public function update(d:float){
		if(isOver_){
			return "event";
		}
		
		return "";
	}
	public function over(){
		ctrl_.inputOpen();
	}
	
}*/