#pragma strict

class EZDuplicateLevelInState extends StateWithEventMap{

	private var ctrl_:EZDuplicateCtrl = null;
	public function EZDuplicateLevelInState(ctrl:EZDuplicateCtrl){
		ctrl_ = ctrl;
	}
	
}