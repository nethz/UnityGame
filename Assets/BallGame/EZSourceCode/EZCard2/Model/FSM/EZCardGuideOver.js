#pragma strict
class EZCardGuideOver extends State{
	private var ctrl_:EZCardCtrl;
	private var state_:String;
	public function EZCardGuideOver(ctrl:EZCardCtrl, state:String){
		ctrl_ = ctrl;
		state_ = state;
	} 
	public function start(){
		ctrl_.guideOver();
	}
	public function update(d:float){
		return state_;
	}
}