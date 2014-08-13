#pragma strict

class EZCryCompSelectState extends StateWithEventMap{
	private var comp_:EZCryCompCtrl;
	function EZCryCompSelectState(comp:EZCryCompCtrl){
		comp_ = comp;
		//addEvent("go_comp", "comp.web");
		addEvent("go_back", "normal.select");
	}
	

	function postEvent(evt:FSMEvent){
		if("go_comp" == evt.msg){
			if(comp_.testMaxLv() && comp_.testFrag()){
				return "comp.web";
			}
			
		}
		return super.postEvent(evt);
	}
	


}