#pragma strict
/*
class EZStateEnableTask extends EZStateTask{

	private var msg_:String;
	private var isOver_:boolean = false;
	
	 
	private var fsm_:FSM = null;

	public function over(){
		enable_ = false; 
		isOver_ = true;
	}
	
	public function set msg(value:String){
		this.msg_ = value;
	}
	
	private function isOverImpl(){
		return isOver_;
	}
	
	private function initImpl(){ 
	
		enable_ = false;
		fsm_.post(this.msg_);
		var wait:EZWaitTask = new EZWaitTask(); 
		wait.setAllTime(0.2);
		TaskManager.PushBack(wait, function(){ 
			if(!enable_){
				 isOver_ = true;
			}
		});
			
		TaskManager.Run(wait);
	}
	
	function EZStateEnableTask(fsm:FSM){ 
		this.fsm_ = fsm;
		this.init = this.initImpl;
		this.isOver = this.isOverImpl;
	}
}*/


class EZStateEnableTask extends EZStateTask{

	function EZStateEnableTask(){    
		this.isOver = function():boolean{ 
			return !enable_;
		};
	}
}