#pragma strict

class EZHeroWinState extends StateWithEventMap{

	private var task_:EZAnimationTask = null;
	
	public function EZHeroWinState(task:EZAnimationTask){
		addEvent("win", "win");
		task_ = task;
	}
	public function start(){
		TaskManager.Run(task_);
	}
	public function over(){
		task_.close1();
	}


}