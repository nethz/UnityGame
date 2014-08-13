#pragma strict

class EZGuideFighter extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function EZGuideFighter(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		Debug.Log("EZGuideFighter start!!!");
	}
}