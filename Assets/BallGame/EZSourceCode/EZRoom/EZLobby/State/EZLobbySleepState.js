#pragma strict

class EZLobbySleepState  extends StateWithEventMap{


	
	public function EZLobbySleepState(){
		addEvent("onForce", "back");
	}
	
	public function start(){
		Debug.LogWarning("sleep");
	}
	
	function postEvent(evt:FSMEvent){
	
		Debug.Log(evt.msg);
		return super.postEvent(evt);
	}
}