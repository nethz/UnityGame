#pragma strict

class EZLogoTouchState extends StateWithEventMap{
	private var ctrl_:EZLogoCtrl = null;
	function EZLogoTouchState(ctrl:EZLogoCtrl){
		addEvent("touch", "go.home");
		ctrl_ = ctrl;
	}
	
	
	function start(){
		ctrl_.showTouch();
		
	}
	
	function update(d:float):String{
		return "";
	}

}