#pragma strict


class EZPVPReadyState extends StateWithEventMap{
	private var isOver_:boolean = false;
	//private var loader_:EZPVPLoader = null;
	public function EZPVPReadyState(){
		
	//	loader_ = loader;
	//	Debug.LogWarning("pvp_B");
	
	}

	public function start(){
		Debug.LogWarning("EZPVPReadyState");
		isOver_ = false;
		var task:Task = walkTask();
		
		TaskManager.Run(task);
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
	
	}
	public function update(d:float):String{
		if(isOver_){
			return "fight.begin.ready";
		}
		return "";
	
	}
	public function walkTask():Task{
	
		var mt:MultiTask = new MultiTask();
		
		var walk:EZWalkTask = TaskManager.instance().factories.createTask("view.player.walk") as EZWalkTask;
		walk.move(new Vector3(-34, 0, 0));
		walk.time = 0.5f;
		
		
		var walk2:EZWalkTask = TaskManager.instance().factories.createTask("view.rival.walk") as EZWalkTask;
		walk2.move(new Vector3(34, 0, 0));
		walk2.time = 0.5f;
		
		var cameraOut:Task = TaskManager.Create("rpg.camera.out") as Task; 
		mt.push(cameraOut);
		
		mt.push(walk);
		mt.push(walk2);
		
		
		TaskManager.PushFront(
			walk, function(){
				ActionManager.Run("view.player.back");
			}
		);
		
		TaskManager.PushBack(
			walk, function(){
				ActionManager.Run("view.player.front");
			}
		);
		
		
		
		TaskManager.PushFront(
			walk2, function(){
				ActionManager.Run("view.rival.back");
			}
		);
		
			
		TaskManager.PushBack(
			walk, function(){
				ActionManager.Run("view.rival.front");
			}
		);
		
		return mt;
	
	}
	public function over(){
	
	}
	
}