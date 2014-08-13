#pragma strict

class EZPetInfoInputState extends State{
	
	private var ctrl_:EZCardCtrl;
	public function EZPetInfoInputState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	} 
	public function start(){
	}
	public function update(d:float){
		if(ctrl_.info.needUpdate){
			return "info.web";
		}
		return "";
	
	}
	function postEvent(evt:FSMEvent){
		Debug.Log(evt.msg);
		if(evt.msg == "mark_no"||evt.msg == "mark_circle"||evt.msg == "mark_diamond"||evt.msg == "mark_x"||evt.msg == "mark_triangle"||evt.msg == "mark_star"){
			ctrl_.info.mark(evt.msg);
			ctrl_.refresh();
		}else if(evt.msg == "share"){
			return "info.share";
		}
		if(evt.msg == "userLocked"){
			if(ctrl_.info.userLocked == EZCard.UserLocked.locked){
				ctrl_.info.userLocked = EZCard.UserLocked.unlocked;
			}else{
				ctrl_.info.userLocked = EZCard.UserLocked.locked;
			}
			ctrl_.refresh();
		}
		return "";
	}
}