#pragma strict

class MissionPvpState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionPvpState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}

	public function start(){
		ctrl_.setFace(MissionCtrl.Face.Pvp);
	}
}