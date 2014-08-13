#pragma strict

class EZCryNormalSelectState extends StateWithEventMap{
	private var normal_:EZCryNormalCtrl;
	function EZCryNormalSelectState(normal:EZCryNormalCtrl){
		normal_ = normal;
		addEvent("give", "normal.give.decision");
		addEvent("comp", "comp.select");
	}
	public function start(){
		normal_.setMode(EZCryNormalCtrl.Mode.Select);
	}
	

	
		
	function postEvent(evt:FSMEvent){
		return super.postEvent(evt);
	}
	


}