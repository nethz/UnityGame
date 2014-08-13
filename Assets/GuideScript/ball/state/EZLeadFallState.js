#pragma strict

class EZLeadFallState extends State{
	var task:Task = null;
	function constructed(){
		this.task = TaskManager.instance().factories.createTask("puzzle.fall") as Task; 
	}
	function start()
	{
		Debug.Log("<========EZLeadFallState==========>");
		Debug.Log("EZLeadFallState");
		TaskManager.Run(this.task);
	}
	
	function update(d:float)
	{
		if(this.task.isOver())
			return "lead_group";
	
		return "";
	}
	
};

