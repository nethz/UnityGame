#pragma strict
class EZPetTaskState extends State{

	private var task_:Task = null;
	private var isOver_ = false;
	private var nextState_:String = "";
	private var state_:String = "";
	public function EZPetTaskState(state:String, task:Task, nextState:String){
		nextState_ = nextState;
		task_ = task;
		state_ = state;
		TaskManager.PushBack(task_, function(){this.isOver_ = true;});
	
	}
	public function start(){
		isOver_ = false;
		TaskManager.Run(task_);
	}
	public function update(d:float){
		if(isOver_){
			return nextState_;
		}
		return "";
	}
	

}