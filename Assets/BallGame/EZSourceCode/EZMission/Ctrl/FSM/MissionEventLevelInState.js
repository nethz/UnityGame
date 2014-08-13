#pragma strict

class MissionEventLevelInState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionEventLevelInState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}

}