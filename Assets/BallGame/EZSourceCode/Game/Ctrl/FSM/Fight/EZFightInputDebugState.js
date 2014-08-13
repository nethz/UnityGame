#pragma strict
class EZFightInputDebugState extends StateWithEventMap{
	private var isOver_:boolean;
	
	
	private var task_:Task = null;
	
	public function EZFightInputDebugState(task:Task, context:EZModelContext){
		addEvent("attack", "fight.run.start");
		addEvent("swap.bag1", "fight.swapBag1");
		addEvent("swap.bag2", "fight.swapBag2");
		task_ = task;
	}
	
	public function start(){
		isOver_ = false;
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(1);
		TaskManager.PushBack(wait, function(){
			isOver_ = true;
		}); 
		TaskManager.Run(wait);
	
	}
	
	public function update(d:float){
		if(isOver_){ 
			return "fight.run.start";
		} 
		return "";
	}
	
	public function over(){
	}
}
