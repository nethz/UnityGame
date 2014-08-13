#pragma strict

class MissionPvpInState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var isOver_:boolean = false;
	public function MissionPvpInState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	
	
	public function start(){
		isOver_ = false;
		ctrl_.inputClose();
		
	}
	public function over(){
		ctrl_.inputOpen();
	}
	

	
}