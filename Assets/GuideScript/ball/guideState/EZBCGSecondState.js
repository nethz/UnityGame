#pragma strict

class EZBCGSecondState extends State{
	//private var text_:EZBallCtrlGuideText = null;
	private var dialogueCtrl_:EZPuzzleDialogueCtrl = null;
	private var balls_:EZBallsManagerImpl = null; 
	private var ballStateCopy_:EZBallViewData.State[] = null; 
	private var fail_:boolean = true;
	public function EZBCGSecondState(dialogueCtrl:EZPuzzleDialogueCtrl, balls:EZBallsManagerImpl){
		dialogueCtrl_ = dialogueCtrl;
		balls_ = balls;
	} 
	public function copy(ballState:EZBallViewData.State[]){
		 ballStateCopy_ = new EZBallViewData.State[ballState.Length]; 
		 for(var i:int = 0; i<ballStateCopy_.Length; ++i){
		 	 ballStateCopy_[i] = ballState[i];
		 }
	}
	public function start(){ 
		Debug.Log("<--------EZBCGSecondState start!!!--------->");
		dialogueCtrl_._bigBox.enabled = false;
		var task:Task = dialogueCtrl_.puzzleUpTask();
		TaskManager.PushBack(task,function(){
			dialogueCtrl_.typerDialogue(dialogueCtrl_._readyEndIndex + 1,false);
		});
		TaskManager.Run(task);
		copy(balls_.ballState); 
		fail_ = true;
	}
	public function getState(ballState:EZBallViewData.State[]):EZBallViewData.State{
		 var state:EZBallViewData.State = EZBallViewData.State.Perfect;
		 for(var i:int = 0; i<ballState.Length; ++i){
		 	 if(ballState[i] > state){
		 	 	state = ballState[i];
		 	 }
		 
		 }
		 return state;
		 
	}
	 
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "next"){
			var old:EZBallViewData.State = getState(ballStateCopy_);
			var last:EZBallViewData.State = getState(balls_.ballState); 
			if(old == last ){
				 if(fail_ && last == EZBallViewData.State.Perfect ){ 
				 	//text_._typer.setText(text_._fail, 0.1f);
				 	dialogueCtrl_.typerDialogue(dialogueCtrl_._readyEndIndex + 2,false);
				 	fail_ = false;
				 }
			}else{
				/* if(last == EZBallViewData.State.Flaw){
				 	dialogueCtrl_.typerDialogue(dialogueCtrl_._readyEndIndex + 3,false);
				 }else */if(last == EZBallViewData.State.Splintering){
				 	dialogueCtrl_.typerDialogue(dialogueCtrl_._readyEndIndex + 4,false);
				 }else if(last == EZBallViewData.State.Diamond){
				 	return "diamond";
				 }
				
			}
			copy(balls_.ballState);
		}
		return "";
	}
}