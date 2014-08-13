#pragma strict

class EZGuidePuzzleState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function EZGuidePuzzleState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		ctrl_._puzzle.activeManager();
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "select";
		}
		return "";
		
	}
}