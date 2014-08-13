#pragma strict


class EZCrystalSideNormalState extends State{
	
	private var ctrl_:EZCrystalSideCtrl = null;
	function EZCrystalSideNormalState(ctrl:EZCrystalSideCtrl){
		ctrl_ = ctrl;
	}
	function start(){
	}
	function update(d:float):String{
		if(ctrl_.filled){
			
			ctrl_.filled = false;
			return "filled";
		
		}
		return "";
	}
	
};

