#pragma strict

class DialogueOverState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function DialogueOverState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		Debug.Log("DialogueOverState start!!!");
		isOver_ = false;
		var task:Task = ctrl_._camera.walkEndTask();
		TaskManager.PushFront(task,function(){
			//ctrl_._dialogue.showCursor(false);
			ctrl_._typer.showCursor(false);
		});
		TaskManager.PushBack(task,function(){
			//ctrl_._dialogue.clearText();
			ctrl_._typer.clear();
			isOver_ = true;
		});
		TaskManager.Run(task);
	}
	
	public function update(d:float){
		if(isOver_){
			return "puzzle.in";
		}
		return "";
	}
	

	
}