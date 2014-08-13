#pragma strict

class EZMenuSelectState extends State{
	private var lobby_:EZLobbyCtrl;
	private var isOver_:boolean = false;
	function EZMenuSelectState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	
	
	function start(){
		lobby_.firstIn();
		isOver_ = true;
	}
	 
	function over(){
	}
	
	function update(d:float):String{
		if(isOver_){
			if(EZUserTable.GetInstance().first){
				return "menu.register";
			}else{
				return "menu.login";
			}
			
		}
		
	}
}