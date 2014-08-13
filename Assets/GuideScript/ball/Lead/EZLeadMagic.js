#pragma strict

class EZLeadMagic extends MonoBehaviour{
	public var _ctrl:EZLeadCtrl = null;

	private var fsm_:FSM = new FSM();
	public function Awake(){
		fsm_.addState("close", new EZLeadMagicClose(_ctrl), "");
		fsm_.addState("open", new EZLeadMagicOpen(_ctrl), "");
		fsm_.addState("dialog", new EZLeadMagicDialog(_ctrl), "open");
		fsm_.addState("bag1", new EZLeadMagicBag1(_ctrl), "open");
		fsm_.addState("hide", new EZLeadInfoHide(_ctrl), "open");
		fsm_.init("close");
	}
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	public function touch(id:String){
		if(id == "Bag1"){
			this.fsm_.post("bag1");
		}
	}
	public function open(){
		this.fsm_.post("open");
		//_ctrl._touchBag1.enabled = true;
		//_ctrl._camera.cullingMask = (1<<_ctrl._bag1.pet.body.gameObject.layer)| (1<<_ctrl.gameObject.layer);
		//GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.WeBag1, true, _ctrl.gameObject.layer), SendMessageOptions.DontRequireReceiver);
	
	
	}
	/*
	public function close(){
		_ctrl._touchBag1.enabled = false;
		_ctrl._camera.cullingMask = 0;
		GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.WeBag1, false, -1), SendMessageOptions.DontRequireReceiver);
	
	}*/
	
}