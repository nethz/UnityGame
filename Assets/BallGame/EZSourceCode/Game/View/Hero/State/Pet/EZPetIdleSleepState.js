#pragma strict

class EZPetIdleSleepState extends StateWithEventMap{

	
	private var body_:EZSkeletal = null;
	private var hud_:EZHud = null;
	private var fun_:Function = null;
	public function EZPetIdleSleepState(fun:Function, body:EZSkeletal, hud:EZHud){
	
		addEvent("weakup", "weakup.idle");
		body_ = body;
		hud_ = hud;
		fun_ = fun;
	}
	public function start(){
		fun_();
		body_.boxCollider.enabled = false;
		if(hud_)
			hud_.alpha = 0;
			
		
	}
	public function over(){
	
		body_.boxCollider.enabled = true;
		body_.alpha = 1;
		if(hud_){
			TweenAlpha.Begin(hud_._panel.gameObject, 0.3f, 1f);
		}
		
	}


}