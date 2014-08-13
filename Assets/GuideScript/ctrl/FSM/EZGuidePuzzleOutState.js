#pragma strict

class EZGuidePuzzleOutState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function EZGuidePuzzleOutState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = true;
		//var close:Task = ctrl_._puzzle.closeTask();
		
	//	TaskManager.PushBack(close, function(){
	//		isOver_ = true;
	//	});
	//	TaskManager.Run(close);
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "select";
		}
		return "";
		
	}
}