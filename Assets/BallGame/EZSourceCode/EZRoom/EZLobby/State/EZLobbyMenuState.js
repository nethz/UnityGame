#pragma strict

class EZLobbyMenuState extends State{
	private var lobby_:EZLobbyCtrl = null;
	//private var isOver_:boolean = false;
	public function EZLobbyMenuState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	public function start(){
		
		Debug.Log("EZLobbyMenuState");
	
	}
	public function update(d:float):String{
		//if(isOver_){
			
		//	return "load";
		//}
		return "";
	}
	public function over(){
		
	
	}
}