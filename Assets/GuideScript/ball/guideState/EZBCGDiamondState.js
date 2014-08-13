#pragma strict

class EZBCGDiamondState extends State{
	//private var text_:EZBallCtrlGuideText = null;
	private var dialogueCtrl_:EZPuzzleDialogueCtrl = null;
	private var balls_:EZBallsManagerImpl = null;
	private var ballStateCopy_:EZBallViewData.State[] = null; 
	private var first_:boolean = true;
	public function EZBCGDiamondState(dialogueCtrl:EZPuzzleDialogueCtrl, balls:EZBallsManagerImpl){
		dialogueCtrl_ = dialogueCtrl;
		balls_ = balls;
	}
	private function copy(ballState:EZBallViewData.State[]){
		 ballStateCopy_ = new EZBallViewData.State[ballState.Length]; 
		 for(var i:int = 0; i<ballStateCopy_.Length; ++i){
		 	 ballStateCopy_[i] = ballState[i];
		 
		 }
	}
	/*public function addText(text:String){
		if(first_){
			first_ = false;
			text_._typer.setText(text, 0.1f);
		}else{
			
			text_._typer.addText("\n" +text, 0.1f);
		
		}
	
	}*/
	
	public function start(){
		dialogueCtrl_.typer.clear();
		first_ = true; 
		copy(balls_.ballState);
		if(ballStateCopy_[Geek.MagicType.Metal] == EZBallViewData.State.Diamond){
			dialogueCtrl_.typerDiamond(Geek.MagicType.Metal);
		}
		 
		 if(ballStateCopy_[Geek.MagicType.Wood] == EZBallViewData.State.Diamond){
		 	dialogueCtrl_.typerDiamond(Geek.MagicType.Wood);
		 }
		 if(ballStateCopy_[Geek.MagicType.Water] == EZBallViewData.State.Diamond){
		 	dialogueCtrl_.typerDiamond(Geek.MagicType.Water);
		 }
		 if(ballStateCopy_[Geek.MagicType.Fire] == EZBallViewData.State.Diamond){
		 	dialogueCtrl_.typerDiamond(Geek.MagicType.Fire);
		 }
		 if(ballStateCopy_[Geek.MagicType.Earth] == EZBallViewData.State.Diamond){
		 	dialogueCtrl_.typerDiamond(Geek.MagicType.Earth);
		 }
		 if(ballStateCopy_[Geek.MagicType.Crystal] == EZBallViewData.State.Diamond){
		 	dialogueCtrl_.typerDiamond(Geek.MagicType.Crystal);
		 }
	}
	private function getMagicType(magicType:Geek.MagicType, ballState:EZBallViewData.State[]):boolean{
		 if(ballStateCopy_[magicType] != EZBallViewData.State.Diamond && ballState[magicType] == EZBallViewData.State.Diamond)
		 	 return true;
		 return false;
		 
	}
	private function allOver(ballState:EZBallViewData.State[]){
		 for(var i:int = 0; i<ballState.Length; ++i){
		 	 if(ballState[i] != EZBallViewData.State.Diamond){
		 	 	return false;
		 	 }
		 }
		 return true;
	}
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "next"){
			dialogueCtrl_.typer.clear();
			if(getMagicType(Geek.MagicType.Metal, balls_.ballState)){
		 		//addText(text_._metal);
		 		dialogueCtrl_.typerDiamond(Geek.MagicType.Metal);
			}
		
			if(getMagicType(Geek.MagicType.Wood, balls_.ballState)){
		 		dialogueCtrl_.typerDiamond(Geek.MagicType.Wood);
			}
		
			if(getMagicType(Geek.MagicType.Water, balls_.ballState)){
		 		dialogueCtrl_.typerDiamond(Geek.MagicType.Water);
			}
		
			if(getMagicType(Geek.MagicType.Fire, balls_.ballState)){
		 		dialogueCtrl_.typerDiamond(Geek.MagicType.Fire);
			}
		
			if(getMagicType(Geek.MagicType.Earth, balls_.ballState)){
		 		dialogueCtrl_.typerDiamond(Geek.MagicType.Earth);
			}
			if(getMagicType(Geek.MagicType.Crystal, balls_.ballState)){
		 		dialogueCtrl_.typerDiamond(Geek.MagicType.Crystal);
			}
			if(allOver(balls_.ballState)){
				//text_.next = false;
			}
			copy(balls_.ballState);
		}
		if(evt.msg == "over"){
			return "over";
		}
		return "";
	}
}