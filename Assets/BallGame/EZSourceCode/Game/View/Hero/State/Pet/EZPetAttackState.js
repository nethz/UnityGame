#pragma strict

class EZPetAttackState extends State{
	private var task_:EZAnimationTask = null;
	private var isOver_ = false;
	public function EZPetAttackState(task:EZAnimationTask){
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
			return "weakup.idle";
		}
		return "";
	}
	public function over(){
		task_.close();
	}
}