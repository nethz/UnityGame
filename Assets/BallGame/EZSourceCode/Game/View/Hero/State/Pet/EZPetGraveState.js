#pragma strict

class EZPetGraveState extends StateWithEventMap{

	private var body_:EZSkeletal = null;
	private var hud_:EZHud = null;
	private var ghost_:EZGhost = null;
	public function EZPetGraveState(body:EZSkeletal,ghost:EZGhost){
		addEvent("weakup", "ghost");
		body_ = body;
		//hub_ = hub;
		ghost_ = ghost;
	}
	public function start(){
		ghost_.hide();
		body_.boxCollider.enabled = false;
	}
	public function over(){
	
		body_.boxCollider.enabled = true;
		//body_.alpha = 1;
		//if(hub_)
		//	hub_.alpha = 1;
	}


}