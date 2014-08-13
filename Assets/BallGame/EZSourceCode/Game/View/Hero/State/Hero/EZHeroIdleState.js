#pragma strict

class EZHeroIdleState extends StateWithEventMap{

	private var task_:EZAnimationTask = null;
	
	public function EZHeroIdleState(task:EZAnimationTask){
		addEvent("walk", "walk");
		addEvent("win", "win");
		addEvent("stop", "stop");
		task_ = task;
	}
	public function start(){
		TaskManager.Run(task_);
	}
	public function over(){
	
		task_.close1();
	}


}