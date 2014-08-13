#pragma strict

class DialogueState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function DialogueState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		Debug.Log("DialogueState start!!!");
		isOver_ = false;

	}
	
	public 	function postEvent(evt:FSMEvent){
		Debug.Log(evt.msg);
		if(evt.msg == "forward"){
			//if(ctrl_._dialogue.dialogueEnd){
			if(ctrl_._typer.textsOver){
				isOver_ = true;
			}else{
				ctrl_.forward();
			}
		}
		return super.postEvent(evt);
	}
	public function update(d:float){
		if(isOver_){
			return "dialogueOver";
		}
		return "";
	}
	
}