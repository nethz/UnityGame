#pragma strict

class MissionPlayState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var isOver_:boolean = false;
	
	public function MissionPlayState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
		addEvent("weixin", "go.weixin");
	}
	
	function postEvent(evt:FSMEvent){
		return super.postEvent(evt);
	}
}