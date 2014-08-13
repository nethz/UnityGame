#pragma strict

class EZGuidePuzzlePlayState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function EZGuidePuzzlePlayState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		var open:Task = ctrl_._puzzle.playTask();
		
		TaskManager.PushBack(open, function(){
			isOver_ = true;
			
		});
		TaskManager.Run(open);
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "puzzle.out";
		}
		return "";
	}
}