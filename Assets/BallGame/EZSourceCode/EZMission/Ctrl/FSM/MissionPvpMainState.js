#pragma strict

class MissionPvpMainState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionPvpMainState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}

}