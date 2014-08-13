#pragma strict


class EZFinishState extends State{

	private var context_:EZModelContext = null;
	function EZFinishState(context:EZModelContext){
		context_ = context;
	}
	function start(){
		EZCtrl.ViewCrystal(false);
		context_.back.setEnabled(false);
	
	}
	function over(){
		context_.back.setEnabled(true);
	}
	
}