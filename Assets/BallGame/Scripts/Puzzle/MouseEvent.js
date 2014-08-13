#pragma strict

class PuzzleEvent{

	var position:Vector2;
	
	function PuzzleEvent(p:Vector2){
	
		
		this.position = p;
		
	}

};


class MouseEvent{

	var button:int;
	var position:Vector2;
	var opposite:Vector2;
	
	function MouseEvent(b:int, p:Vector2){
		this.button = b;
		this.position = p;
	}

};
