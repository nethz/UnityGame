#pragma strict

class DialogueStartState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function DialogueStartState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		Debug.Log("DialogueStartState start!!!");
		isOver_ = false;
		//var diaStartTask:Task = ctrl_._dialogue.showFirstText();
		var diaStartTask:Task = ctrl_._typer.showTextTask(0);
		TaskManager.PushBack(diaStartTask,function(){
			isOver_ = true;
		});
		TaskManager.Run(diaStartTask);
	}
	
	public function update(d:float){
		if(isOver_){
			return "dialogue";
		}
		return "";
	}
	

	
}