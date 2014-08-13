#pragma strict
/*
class EZDuplicatePvpInState extends StateWithEventMap{
	
	private var ctrl_:EZDuplicateCtrl = null;
	//private var nextState_:String;
	private var task_:Task = null;
	private var isOver_:boolean = false;
	private var callback_:Function = null;
	public function EZDuplicatePvpInState(ctrl:EZDuplicateCtrl){
		this.ctrl_ = ctrl;
		callback_ = function(){};
	}
	
	
	public function EZDuplicatePvpInState(ctrl:EZDuplicateCtrl,callback:Function){
		this.ctrl_ = ctrl;
		this.callback_ = callback;
	}
	public function start(){
		isOver_ = false;
		ctrl_.inputClose();
		Debug.LogWarning("EZDuplicatePvpInState!!!!!");
		task_ = ctrl_.flyPvpTask(callback_);
		TaskManager.PushBack(task_, function(){isOver_ = true;});
		TaskManager.Run(task_);
		
	}
	public function update(d:float){
		if(isOver_){
			Debug.LogWarning("pvp!!!!");
			return "pvp";
		}
		
		return "";
	}
	public function over(){
		ctrl_.inputOpen();
	}
	
}*/