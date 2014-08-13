#pragma strict

class EZStateForTask extends State{
	private var task_:EZStateTask = null;
	private var state_:State = null;
	private var enable_:boolean = false;
	public function EZStateForTask(state:State){
		state_ = state;
	}
	public function set task(value:EZStateTask){
		this.task_ = value;
		this.task_.enable = enable_;
	}
	public function start(){ 
		if(task_){
			task_.start();
		}
		enable_ = true;
		state_.start();
	}
	public function update(d:float){
		return state_.update(d);
	}
	public function over(){
		
		state_.over(); 
		if(task_){
			task_.over();
			this.task_ = null;
		}
		
		enable_ = false;
	}
	
	
	
	function constructed(){
		 state_.constructed();
	}
	
	
	function postEvent(evt:FSMEvent){
		return state_.postEvent(evt);
	}
	
}