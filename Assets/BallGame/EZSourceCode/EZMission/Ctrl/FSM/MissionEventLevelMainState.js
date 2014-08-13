#pragma strict

class MissionEventLevelMainState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionEventLevelMainState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}

}