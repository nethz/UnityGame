#pragma strict

class MissionEventState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionEventState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
		addEvent("pve", "pve.in");
	}
	public function start(){
		ctrl_.setFace(MissionCtrl.Face.Evt);
	}

}