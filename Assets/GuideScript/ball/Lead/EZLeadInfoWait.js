
#pragma strict


class EZLeadInfoWait extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadInfoWait(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
		addEvent("short", "short");
		addEvent("long", "long");
		
	}
	public function start(){
		
		Debug.LogWarning("EZLeadInfoWait");
		EZPopCtrl.GetInstance().openLead(EZSoul.Seat.FoeBattle, ctrl_._infoPop, ctrl_.gameObject.layer);
		ctrl_._touchFoeBattle.enabled = true;
		ctrl_._camera.cullingMask = (1<<ctrl_._foeBattle.pet.body.gameObject.layer)| (1<<ctrl_.gameObject.layer);
		GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.FoeBattle, true, ctrl_.gameObject.layer), SendMessageOptions.DontRequireReceiver);
	
		
	}
	
	public function over(){
		
		GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.FoeBattle, false, -1), SendMessageOptions.DontRequireReceiver);
		ctrl_._touchFoeBattle.enabled = false;
		ctrl_._camera.cullingMask = 0;
	}
}