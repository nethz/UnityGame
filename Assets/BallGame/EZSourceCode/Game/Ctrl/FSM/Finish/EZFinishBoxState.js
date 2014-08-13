#pragma strict


class EZFinishBoxState extends State{
	private var sound_:EZResultSound = null;
	private var isOver_:boolean = false;
	
	public function EZFinishBoxState(sound:EZResultSound){
		sound_ = sound;
	}
	
	public function start(){
		isOver_ = false;
		var wtl:TaskList = new TaskList();
		var provoke:EZIDTask = TaskManager.Create("view.pet.win") as EZIDTask;
		provoke.id = EZSoul.Seat.FoeBattle;
		TaskManager.PushFront(provoke, function(){
			if(EZBGMManager.Instance()){
				EZBGMManager.Instance().stopBGM();
			}
			
			sound_.playWin();
			var weakup:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
			weakup.id =  EZSoul.Seat.FoeBattle;
			weakup.msg = "weakup";
			ActionManager.Run(weakup);
			
			var win:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
			win.id =  EZSoul.Seat.Hero;
			win.msg = "win";
			ActionManager.Run(win);
		});
		/*TaskManager.PushBack(provoke, function(){
			sound_.playWin();
		});*/
		var reward:Task = TaskManager.instance().factories.createTask("rpg.camera.reward") as Task;
		wtl.push(reward);
		wtl.push(provoke);
		
		TaskManager.PushBack(wtl, function(){
			isOver_ = true;
		});
		TaskManager.Run(wtl);
	}
	

	public function update(d:float){ 
		
		if(isOver_){
			return "finish.show.start";
		}
		return "";
	}
	
}