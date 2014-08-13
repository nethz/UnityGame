#pragma strict

class EZHeroWalkState extends StateWithEventMap{	

	function EZHeroWalkState(task:EZAnimationTask){
		addEvent("idle", "idle");
		task_ = task;
	}
	private var task_:EZAnimationTask = null;
	
	
	public function start(){
		TaskManager.Run(task_);
	}
	public function over(){
	
		task_.close1();
	}

}