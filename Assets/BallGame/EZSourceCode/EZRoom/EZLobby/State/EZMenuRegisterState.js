#pragma strict

class EZMenuRegisterState extends State{
	private var isOver_:boolean = false;
	
	private var lobby_:EZLobbyCtrl;
	function EZMenuRegisterState(lobby:EZLobbyCtrl){
		lobby = lobby_;
	}
	
	
	function start(){
		Debug.Log("link register...");
		var weixin:EZWeixinTable = EZWeixinTable.GetInstance();
		var register:WebLoaderTask = EZUserTable.GetInstance().register(weixin.weixinId);
		isOver_ = false;
		TaskManager.PushBack(register, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(register);
	}
	 
	
	function update(d:float):String{
		
		if(isOver_){
			return "menu.load";
		}
		return "";
	}
}

