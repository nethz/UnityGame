#pragma strict

class EZPetDeathState extends StateWithEventMap{

	private var body_:EZSkeletal = null;
	private var hud_:EZHud = null;
	private var flame_:EZFlameManager = null;
	public function EZPetDeathState(body:EZSkeletal, hud:EZHud, flame:EZFlameManager){
		//addEvent("weakup", "ghost");
		body_ = body;
		hud_ = hud;
		flame_ = flame;
	}
	public function start(){
		body_.boxCollider.enabled = false;
	}
	public function over(){
		body_.boxCollider.enabled = true;
		body_.alpha = 1;
		if(hud_)
			hud_.alpha = 1;
		if(flame_)
			flame_.alpha = 1;
	}


}