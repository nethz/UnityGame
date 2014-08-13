#pragma strict

class EZLobbyOutState  extends StateWithEventMap{

	private var lobby_:EZLobbyCtrl = null;
	
	public function EZLobbyOutState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	
	public function start(){
		lobby_.guide.canShowPop = false;
	}
}