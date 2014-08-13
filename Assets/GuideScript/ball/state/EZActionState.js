#pragma strict

class EZActionState extends State{
	private var info_:EZRemoveInfo = null;
	private var ctrl_:EZBallCtrl;
	public function EZActionState(ctrl:EZBallCtrl, info:EZRemoveInfo){
		this.info_ = info;
		ctrl_ = ctrl;
	} 
	function constructed(){
	
	}
	function start(){
		ctrl_.disableInput();
		info_.clear();
	
	}
	function update(d:float){
	
	
	}
	
	function over(){
		info_.print();
	
	}
}