#pragma strict

class MissionOutState extends State{
	private var ctrl_:MissionCtrl = null;
	
	public function MissionOutState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		Debug.LogWarning('start!!@!@!#@$#@#$@#$');
		ctrl_.inputClose();
	}
}