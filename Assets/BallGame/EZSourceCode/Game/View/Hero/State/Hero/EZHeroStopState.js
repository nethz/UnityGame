#pragma strict

class EZHeroStopState extends StateWithEventMap{

	private var body_:EZSkeletal = null;

	public function EZHeroStopState(body:EZSkeletal){
		body_ = body;
		addEvent("idle", "idle");
	}
	public function start(){
		body_.pose("idle");
	}
	public function over(){
		
	}


}