
#pragma strict


class EZLeadMagicBag1 extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadMagicBag1(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
		addEvent("bag1", "hide");
		
	}
	public function start(){
		
		Debug.LogWarning("EZLeadMagicBag1");
		EZPopCtrl.GetInstance().openLead(EZSoul.Seat.WeBag1, ctrl_._magicPop, ctrl_.gameObject.layer);
		ctrl_._touchBag1.enabled = true;
		ctrl_._camera.cullingMask = (1<<ctrl_._bag1.pet.body.gameObject.layer)| (1<<ctrl_.gameObject.layer);
		GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.WeBag1, true, ctrl_.gameObject.layer), SendMessageOptions.DontRequireReceiver);
	
		
	}
	
	public function over(){
		
		GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.WeBag1, false, -1), SendMessageOptions.DontRequireReceiver);
		ctrl_._touchBag1.enabled = false;
		ctrl_._camera.cullingMask = 0;
	}
}