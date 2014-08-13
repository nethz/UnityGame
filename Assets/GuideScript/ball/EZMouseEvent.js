#pragma strict



class EZMouseEvent{

	var button:int;
	var position:Vector2;
	var absolute:Vector2;
	var worldPoint:Vector2; 
	
	function EZMouseEvent(b:int, p:Vector2){
		this.button = b;
		this.absolute = p;
	}

};
