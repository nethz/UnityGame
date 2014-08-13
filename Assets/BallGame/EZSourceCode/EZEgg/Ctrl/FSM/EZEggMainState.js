#pragma strict

class EZEggMainState extends StateWithEventMap{
	public var _ctrl:EZEggCtrl = null;
	
	public function EZEggMainState(ctrl:EZEggCtrl){
		_ctrl = ctrl;
	}
	
	public function start(){
		_ctrl.load();
		Debug.Log("EZEggMainState start!!");
	}
	
	public function over(){
		//_ctrl.main.close();
		Debug.Log("EZEggMainState over!!");
	}

}