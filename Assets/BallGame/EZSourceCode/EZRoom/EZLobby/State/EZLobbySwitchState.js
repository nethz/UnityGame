#pragma strict

class EZLobbySwitchState extends State{
	private var lobby_:EZLobbyCtrl = null;
	private var isOver_:boolean = false;
	public function EZLobbySwitchState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	public function start(){ 
		Debug.Log("switch");
		isOver_ = false; 
		Debug.Log("switch1");
		//var tl:TaskList = new TaskList();
		Debug.Log("switch2");
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		
		Debug.Log("switch3");
		//tl.push(loading); 
		
		Debug.Log("switch4");
		
		TaskManager.PushBack(loading, function(){
			isOver_ = true;
			Debug.Log("switch5");
		});
		TaskManager.Run(loading);
	
	}
	public function update(d:float):String{
		if(isOver_){
			var table:EZUserTable = EZUserTable.GetInstance();
			if(table.isLogin){
				return "comeIn";
			}
			return "menu.select";
		
		}
		return "";
	}
}