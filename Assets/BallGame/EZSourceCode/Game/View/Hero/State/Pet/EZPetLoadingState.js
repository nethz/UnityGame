#pragma strict

class EZPetLoadingState extends StateWithEventMap{

	public function EZPetLoadingState(){
		addEvent("loaded", "sleep");
		
	}
	public function start(){
		
	}


}