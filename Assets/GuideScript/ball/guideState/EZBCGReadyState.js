#pragma strict

class EZBCGReadyState extends State{
	private var dialogueCtrl_:EZPuzzleDialogueCtrl = null;
	private var index_:int = 0;

	public function EZBCGReadyState(dialogueCtrl:EZPuzzleDialogueCtrl){
		dialogueCtrl_ = dialogueCtrl;
	} 
	
	function start(){
		Debug.Log("<--------EZBCGReadyState start!!!--------->");
		dialogueCtrl_._cursor.hide();
		dialogueCtrl_._bigBox.enabled = true;
		index_ = 0;
		var showDragon:Task = dialogueCtrl_.showDragon();
		TaskManager.PushBack(showDragon,function(){
			dialogueCtrl_.typerDialogue(index_,true);
		});
		TaskManager.Run(showDragon);
	}

	function over(){
		
	}
	
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "dialogue"){
			index_++; 
			if(index_ > dialogueCtrl_._readyEndIndex){
				dialogueCtrl_.typer.clear();
				return "second";
			}
			dialogueCtrl_.typerDialogue(index_,true);
		}
		return "";
	}
}