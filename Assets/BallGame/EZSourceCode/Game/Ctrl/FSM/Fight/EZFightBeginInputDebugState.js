#pragma strict
class EZFightBeginInputDebugState extends StateWithEventMap{
	private var isOver_:boolean;
	private var task_:Task;
	public function EZFightBeginInputDebugState(task:Task, context:EZModelContext){
		addEvent("attack", "fight.begin");
		task_ = task;
	}
	
	public function start(){
		TaskManager.Run(task_);
	}
	
	public function over(){
	}
}
