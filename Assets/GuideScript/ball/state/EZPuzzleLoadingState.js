#pragma strict

class EZPuzzleLoadingState extends StateWithEventMap{
	
	function EZPuzzleLoadingState(nextState:String){
		addEvent("loaded", nextState);
	}
	
};

