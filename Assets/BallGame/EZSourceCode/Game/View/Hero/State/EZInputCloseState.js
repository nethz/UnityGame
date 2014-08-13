#pragma strict

class EZInputCloseState extends StateWithEventMap{
	private var callback_:Function;
	public function EZInputCloseState(callback:Function){
		addEvent("enable", "open.normal");
		addEvent("info", "open.info");
		callback_ = callback;
	}
	public function start(){
		callback_();
	}
}