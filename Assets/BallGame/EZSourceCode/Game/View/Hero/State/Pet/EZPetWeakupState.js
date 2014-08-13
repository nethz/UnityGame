#pragma strict

class EZPetWeakupState extends StateWithEventMap{
	
	private var start_:Function = null;
	private var over_:Function = null;
	public function EZPetWeakupState(start:Function, over:Function){
		this.start_ = start;
		this.over_ = over;
		addEvent("sleep", "drowsy");
		addEvent("die", "die");
		addEvent("hurtDie", "hurtDie");
		addEvent("freeing", "freeing");
		
	}
	public function start(){
		this.start_();
	}
	public function over(){
		this.over_();
	}


}