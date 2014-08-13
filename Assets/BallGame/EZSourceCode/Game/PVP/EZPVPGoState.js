#pragma strict


class EZPVPGoState extends StateWithEventMap{
	private var isOver_:boolean = false;
	public function EZPVPGoState(){
		
	
	}

	public function start(){
		Debug.LogWarning("EZPVPGoState");
		var start:Task = TaskManager.Create("rpg.camera.start") as Task; 
		TaskManager.Run(start);
		ActionManager.Run("view.input.enable");
		
		var post:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
		for(var i:int = 0; i<6; ++i){
			post.id = i;
			post.msg = "weakup";
			ActionManager.Run(post);
		}
		
	
	}

	public function over(){
	
	}
	
}