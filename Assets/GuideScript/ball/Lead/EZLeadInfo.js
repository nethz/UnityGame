#pragma strict

class EZLeadInfo extends MonoBehaviour{
	public var _ctrl:EZLeadCtrl = null;
	private var fsm_ = new FSM();
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function Awake(){
		fsm_.addState("close", new EZLeadInfoClose(_ctrl), "");
		fsm_.addState("open", new EZLeadInfoOpen(_ctrl), "");
		fsm_.addState("dialog", new EZLeadInfoDialog(_ctrl), "open");
		//fsm_.addState("hide", new EZLeadInfoHide(_ctrl), "open");
		fsm_.addState("wait", new EZLeadInfoWait(_ctrl), "open");
		fsm_.addState("short", new EZLeadInfoShort(_ctrl), "open");
		fsm_.addState("long", new EZLeadInfoLong(_ctrl), "open");
		fsm_.init("close");
	}
	
	public function longTouch(id:String){
		if(id == "Battle"){
			fsm_.post("long");
		}
	
	}
	

	public function touch(id:String){
		if(id == "Battle"){
			fsm_.post("short");
		}else if(id == "Back"){
			Debug.Log("!!!!");
			fsm_.post("back");
		}
	
	}
	public function open(){
		//if(id == "Battle"){
		fsm_.post("open");
		//}
		//_ctrl._touchFoeBattle.enabled = true;
		//_ctrl._camera.cullingMask = 1<<_ctrl._foeBattle.pet.body.gameObject.layer;
		//GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.FoeBattle, true, _ctrl._foeBattle.pet.body.gameObject.layer), SendMessageOptions.DontRequireReceiver);
	
	
	}
	public function close(){
		//_ctrl._touchFoeBattle.enabled = false;
		//_ctrl._camera.cullingMask = 0;
		//GameObject.FindGameObjectWithTag("RPG").SendMessage("flickerMessage", new EZViewPet.Flicker(EZView.Seat.FoeBattle, false, -1), SendMessageOptions.DontRequireReceiver);
	
	}
	
}