#pragma strict

class EZEggWebDiamondState extends StateWithEventMap{
	private var ctrl_:EZEggCtrl = null;
	public function EZEggWebDiamondState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
	}
	
	function postEvent(evt:FSMEvent){
		//Debug.Log(evt.msg);
		//Debug.Log(super.postEvent(evt));
		//return super.postEvent(evt);
	}
	
	public function start(){
		//ctrl_.anima.show(true);
		//ctrl_.anima.drawN();
	}
	
	public function over(){
		//ctrl_.anima.show(false);
	}
}