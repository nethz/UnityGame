#pragma strict

class MissionPveState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionPveState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
		addEvent("evt", "event.in");
		
	}

	public function start(){
		ctrl_.setFace(MissionCtrl.Face.Pve);
	}
	public function over(){
		ctrl_.switchBtn.close();
	}
}