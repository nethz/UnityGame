#pragma strict

class MissionPvpLevelMainState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionPvpLevelMainState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}

}