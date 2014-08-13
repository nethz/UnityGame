#pragma strict

class MissionPvpLevelInState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionPvpLevelInState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}

}