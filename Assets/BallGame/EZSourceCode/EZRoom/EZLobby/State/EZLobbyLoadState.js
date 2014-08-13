#pragma strict
/*
class EZLobbyLoadState extends State{
	private var lobby_:EZLobbyCtrl = null;
	private var isOver_:boolean = false;
	public function EZLobbyLoadState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	public function start(){
		isOver_ = false;
		
		var tl:TaskList = new TaskList();
		tl.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Home));
		
	
		
		//var hero:Task = lobby_.loadHeroTask();
		
		//tl.push(hero);
		TaskManager.PushBack(tl, function(){
			lobby_.guide.open();
			isOver_ = true;
		});
		TaskManager.Run(tl);
		
		
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "play";
		}
		return "";
	}
}*/