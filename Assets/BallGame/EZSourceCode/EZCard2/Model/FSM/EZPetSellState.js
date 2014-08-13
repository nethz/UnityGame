#pragma strict

class EZPetSellState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	public function EZPetSellState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
		addEvent("ButtonInfo", "info.input");
		addEvent("ButtonComp", "comp.input");
		addEvent("ButtonTeam", "team.input");
		addEvent("back", "back");
	} 
	public function start(){
	
		ctrl_.setState(EZCardCtrl.State.Sell);
	}
	public function over(){
	
		ctrl_.setState(EZCardCtrl.State.None);
	}
	/*
	function postEvent(evt:FSMEvent){
		
		if(evt.msg == "sell"){
			
		}
		return super.postEvent(evt);
	}*/
}