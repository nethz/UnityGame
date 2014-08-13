#pragma strict
class EZStateForAction extends State{

	private var task_:EZAnimationTask = null;
	private var isOver_ = false;
	private var nextState_:String = "weakup.idle";
	
	
		
	public function EZStateForAction(task:EZAnimationTask){
		task_ = task;
		TaskManager.PushBack(task_, function(){this.isOver_ = true;});
	
	}
	
	function postEvent(evt:FSMEvent)
	{	
		switch(evt.msg){
			case "attack":
				nextState_ = "weakup.attack";
				task_.setShifting(100);
			break;
			case "magic":
				nextState_ = "weakup.magic";
				task_.setShifting(100);
			break;
			case "provoke":
				nextState_ = "weakup.provoke";
				task_.setShifting(100);
			break;
			case "win":
				nextState_ = "weakup.win";
				task_.setShifting(100);
			break;
			case "hurt":
				nextState_ = "weakup.hurt";
				task_.setShifting(100);
			break;
		}
	
		return super.postEvent(evt);
	}
	public function start(){
		nextState_ ="weakup.idle";
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
		task_.setShifting(1);
	}
	

}