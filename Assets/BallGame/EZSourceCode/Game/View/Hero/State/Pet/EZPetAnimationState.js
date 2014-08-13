#pragma strict

class EZPetAnimationState extends State{

	private var task_:EZAnimationTask = null;
	private var isOver_ = false;
	private var nextState_:String = "";
	public function EZPetAnimationState(task:EZAnimationTask, nextState:String){
		nextState_ = nextState;
		task_ = task;
		task_.setCallback(function(){
			this.isOver_ = true;
			});
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
	public function over(){
		task_.close();
	}
}