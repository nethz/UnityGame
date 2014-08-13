#pragma strict


class EZLeadSwapBattle extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadSwapBattle(ctrl:EZLeadCtrl){
		
		addEvent("Battle", "bag1");
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.LogWarning("EZLeadSwapBattle");
		if(!String.IsNullOrEmpty(ctrl_._swapPop)){
				EZPopCtrl.GetInstance().openLead(EZSoul.Seat.WeBattle, ctrl_._swapPop, ctrl_.gameObject.layer);
		}
		ctrl_._touchBattle.enabled = true;
		ctrl_._camera.cullingMask = (1<<ctrl_._battle.pet.body.gameObject.layer)| (1<<ctrl_.gameObject.layer);
		
		GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.WeBattle, true, ctrl_.gameObject.layer), SendMessageOptions.DontRequireReceiver);
	
			
	}
	
	public function over(){
		GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.WeBattle, false, -1), SendMessageOptions.DontRequireReceiver);
	
			
		ctrl_._touchBattle.enabled = false;
		ctrl_._camera.cullingMask = 0;
	}
}