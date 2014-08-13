#pragma strict

class EZInputSwapState extends StateWithEventMap{	
	var task_:Task = null;
	var isOver_:boolean = false;
	function EZInputSwapState(task:Task){
		task_ = task;
		TaskManager.PushBack(task_, function(){
			isOver_ = true;
		});
	}
	function start(){
		isOver_ = false;
		TaskManager.Run(task_);
		
	}
	function update(d:float){
		if(isOver_){
			return "open.normal";
		}
		return "";
	}
	function over(){
		
	}
	

}