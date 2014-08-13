#pragma strict

class EZPetState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	public function EZPetState(ctrl:EZCardCtrl){
		addEvent("weixin", "go.weixin");
		ctrl_ = ctrl;
	} 
	
	
}