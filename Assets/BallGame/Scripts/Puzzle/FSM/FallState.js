#pragma strict

class FallState extends State{
	var task:Task = null;
	function constructed(){
		this.task = TaskManager.instance().factories.createTask("puzzle.fall") as Task; 
	}
	function start()
	{
		TaskManager.Run(this.task);
	}
	
	function update(d:float)
	{
		if(this.task.isOver())
			return "group";
	
		return "";
	}
	
};

