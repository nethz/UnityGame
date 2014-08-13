#pragma strict

class EZPetInfoState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	private var infoEnable_:boolean = false;
	public function EZPetInfoState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
		addEvent("ButtonComp", "comp.input");
		addEvent("ButtonSell", "sell.input");
		addEvent("ButtonTeam", "team.input");
		addEvent("back", "back");
		
	} 
	
	function postEvent(evt:FSMEvent){
		
		if(evt.msg == "AffixInfo"){
			infoEnable_ = !infoEnable_;
			ctrl_.info.showAffixInfo(infoEnable_);
			if(infoEnable_){
				ctrl_.info.switchBtnAffix("petDetailsOff");
			}else{
				ctrl_.info.switchBtnAffix("petDetailsOn");
			}
		
		}
		return super.postEvent(evt);
	}
	
	public function start(){
		
		infoEnable_ = false;
		ctrl_.info.switchBtnAffix("petDetailsOn");
		ctrl_.info.showAffixInfo(false);
		
		ctrl_.setState(EZCardCtrl.State.Info);
		
	
	}
	public function over(){
		ctrl_.info.showAffixInfo(false);
		ctrl_.setState(EZCardCtrl.State.None);
	}
	
}