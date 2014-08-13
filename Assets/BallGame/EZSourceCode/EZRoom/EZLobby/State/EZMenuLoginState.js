#pragma strict

class EZMenuLoginState extends State{

	private var isOver_:boolean = false;
	private var lobby_:EZLobbyCtrl;
	function EZMenuLoginState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	
	
	
	function start(){
	
		var login:WebLoaderTask = EZUserTable.GetInstance().login();
		isOver_ = false;
		TaskManager.PushBack(login, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(login);
	}

	function update(d:float):String{
		if(isOver_){
			return "menu.load";
		}
		return "";
		
	}
}