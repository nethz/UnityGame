#pragma strict

class EZBCGStartState extends State{
	private var dialogueCtrl_:EZPuzzleDialogueCtrl = null;
	public function EZBCGStartState(dialogueCtrl:EZPuzzleDialogueCtrl){
		dialogueCtrl_ = dialogueCtrl;
	} 
	
	function start(){
		Debug.Log("<--------EZBCGStartState start!!!--------->");
		dialogueCtrl_._bg.depth = -3;
		dialogueCtrl_.typerDialogue(dialogueCtrl_._readyEndIndex + 1,false);
	}
	
	function over(){
		 
	}
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "next"){
			return "second";
		}
		return "";
	}
}