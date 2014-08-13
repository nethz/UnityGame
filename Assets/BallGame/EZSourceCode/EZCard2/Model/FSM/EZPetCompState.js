#pragma strict

class EZPetCompState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	public function EZPetCompState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
		addEvent("ButtonInfo", "info.input");
		addEvent("ButtonSell", "sell.input");
		addEvent("ButtonTeam", "team.input");
		
		addEvent("back", "back");
	}
	
	public function start(){
		
		ctrl_.setState(EZCardCtrl.State.Comp);
	}
	
	function postEvent(evt:FSMEvent){
		if(evt.msg == "comp_main"){
			ctrl_.comp.actionMain();
			//TaskManager.Run(task);
		}
		return super.postEvent(evt);
	}
	public function over(){
		ctrl_.setState(EZCardCtrl.State.None);
	}
}