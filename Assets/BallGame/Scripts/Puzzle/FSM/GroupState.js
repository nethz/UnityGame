#pragma strict

class GroupState extends State{
	var task:GroupTask = null;

	
	function constructed(){
		this.task = TaskManager.instance().factories.createTask("puzzle.group") as GroupTask; 
	}
	function start(){
		TaskManager.Run(this.task);
	}
	function update(d:float){
		if(task.success()){
			return "remove";
		}
		else{
			var action:EZPostEventAction = ActionManager.Create("controller.postEvent");
			action.msg = "attack";
			ActionManager.Run(action);
			return "curtain";
		}
	}
	function postEvent(evt:FSMEvent) {
	};
};

