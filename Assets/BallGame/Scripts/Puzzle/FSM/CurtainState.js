#pragma strict

class CurtainState extends State{
	private var task_:Task = null; 
	private var isOver_:boolean = false;
	
	function start(){
	
		this.task_ = TaskManager.Create("controller.curtain") as Task;
		isOver_ = false;
		ActionManager.Run("puzzle.curtain.show");
		TaskManager.PushBack(task_, function(){
			this.isOver_ = true;
		});
		TaskManager.Run(this.task_);
		
		
	}
	
	function update(d:float){
		if(isOver_){
			return "user";
		}
		return "";
	}
	function over(){
	
		ActionManager.Run("puzzle.curtain.hide");
	}
	
	
	
};

