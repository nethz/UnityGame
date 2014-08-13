#pragma strict

class EZPetIdleState extends StateWithEventMap{

	private var task_:EZAnimationTask = null;
	
	public function EZPetIdleState(task:EZAnimationTask){
		addEvent("attack", "weakup.attack");
		addEvent("magic", "weakup.magic");
		addEvent("provoke", "weakup.provoke");
		addEvent("win", "weakup.win");
		addEvent("hurt", "weakup.hurt");
		addEvent("medical", "weakup.medical");
		addEvent("hurting", "weakup.hurting");
		task_ = task;
	}
	function postEvent(evt:FSMEvent){
		
		Debug.Log(evt.msg + "!!!!!");
		return super.postEvent(evt);
	}

	public function start(){
		TaskManager.Run(task_);
	}
	public function over(){
	
		task_.close1();
	}


}