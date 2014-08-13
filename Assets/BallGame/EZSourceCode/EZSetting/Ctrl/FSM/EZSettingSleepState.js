#pragma strict

class EZSettingSleepState extends StateWithEventMap{

	public function EZSettingSleepState(){
		addEvent("onForce", "load");
	}
	
	function postEvent(evt:FSMEvent){
		Debug.Log(evt.msg);
		return super.postEvent(evt);
	}
	
	
}