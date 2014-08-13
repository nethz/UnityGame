#pragma strict

class EZPetGhostState extends StateWithEventMap{

	private var ghost_:EZGhost; 
	public function EZPetGhostState(ghost:EZGhost){
	
		addEvent("sleep", "grave");
		addEvent("revive", "revive");
		addEvent("collect", "collect");
		
		ghost_ = ghost;
	}
	public function start(){
		ghost_.show();
	}
	public function over(){
		
		//ghost_.hide();
	}


}