#pragma strict

class EZEggState extends StateWithEventMap{
	private var ctrl_:EZEggCtrl = null;
	public function EZEggState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
		
	//	addEvent("NoBagComp", "go.pet");
	//	addEvent("NoBagMax", "go.shop");
		addEvent("weixin", "go.weixin");
		addEvent("back", "go.home");
	}
	function postEvent(evt:FSMEvent){
		//if(evt.msg == "NoBagCancel"){
		//	ctrl_.noBagWindow.close();
		//}
		return super.postEvent(evt);
	}
	/*
	public function postEvent(evt:FSMEvent){
		if(evt.msg == "reload"){
			loading_.reload();
		}
		return super.postEvent(evt);
	}*/
}