#pragma strict

class EZBCGOverState extends State{
	//private var text_:EZBallCtrlGuideText = null;
	private var dialogueCtrl_:EZPuzzleDialogueCtrl = null;
	private var balls_:EZBallsManagerImpl = null;
	
	public function EZBCGOverState(dialogueCtrl:EZPuzzleDialogueCtrl, balls:EZBallsManagerImpl){
		dialogueCtrl_ = dialogueCtrl;
		balls_ = balls;
	}

	public function start(){
		Debug.Log("<--------EZBCGOverState start!!!--------->");
		dialogueCtrl_.typer.clear();
		dialogueCtrl_._diamondTyper.clear();
		dialogueCtrl_.typer.showTextByIndex(dialogueCtrl_._readyEndIndex + 5);
		balls_.gameOver();
		dialogueCtrl_.goOver();
	}
}