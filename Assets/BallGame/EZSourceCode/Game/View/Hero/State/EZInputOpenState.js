#pragma strict

class EZInputOpenState extends StateWithEventMap{

	
	private var callback_:Function;
	public function EZInputOpenState(callback:Function){
		addEvent("disable", "close");
		callback_ = callback;
	}
	public function start(){
		callback_();
	}

}