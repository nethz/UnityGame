#pragma strict

class EZShopSleepState extends StateWithEventMap{

	public function EZShopSleepState(){
		addEvent("onForce", "shop.load");
	}
	
	function postEvent(evt:FSMEvent){
		Debug.Log(evt.msg);
		return super.postEvent(evt);
	}
	
	
}