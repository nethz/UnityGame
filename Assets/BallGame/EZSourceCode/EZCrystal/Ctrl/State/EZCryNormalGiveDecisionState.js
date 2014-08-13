#pragma strict

class EZCryNormalGiveDecisionState extends StateWithEventMap{
	private var normal_:EZCryNormalCtrl;
	function EZCryNormalGiveDecisionState(normal:EZCryNormalCtrl){
		normal_ = normal;
		addEvent("ok", "normal.give.do");
		addEvent("cancel", "normal.select");
	}
	
	
	

}