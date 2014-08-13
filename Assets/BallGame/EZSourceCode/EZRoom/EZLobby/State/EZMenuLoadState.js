#pragma strict

class EZMenuLoadState extends State{
	private var lobby_:EZLobbyCtrl = null;
	private var isOver_:boolean = false;
	function EZMenuLoadState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	
	function start(){
		isOver_ = false;
		
		var tl:TaskList = new TaskList();
		
		//#if UNITY_EDITOR
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		if(!setup.isLoaded){
			tl.push(setup.load());
		}
	//	#endif
		
		tl.push(EZWeixinTable.GetInstance().delay());
		
		var lobby:Task = EZLobbyTable.GetInstance().reload();
		TaskManager.PushBack(lobby, function(){
			lobby_.loadWeather();
		});
		tl.push(lobby);
		
		var missionBag:EZMissionBagTable = EZMissionBagTable.GetInstance();

		TaskManager.PushBack(tl, function(){
			lobby_.loadOther();
			isOver_ = true;
		});
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;  
		tl.push(loaded);
		tl.push(lobby_.logo.fadeIn());
		TaskManager.Run(tl);
	}

	function update(d:float):String{
		if(isOver_){
			Debug.Log("---=-==!!!!!-=");
			return "menu.touch";
		}
		return "";
	}

}