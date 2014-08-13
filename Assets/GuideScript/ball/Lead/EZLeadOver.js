#pragma strict

class EZLeadOver extends MonoBehaviour{
	public var _ctrl:EZLeadCtrl = null;

	private var fsm_:FSM = new FSM();
	public function Awake(){
		fsm_.addState("close", new EZLeadOverClose(_ctrl), "");
		fsm_.addState("dialog", new EZLeadOverDialog(_ctrl), "");
		fsm_.addState("hide", new EZLeadInfoHide(_ctrl), "");
		fsm_.init("close");
	}
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	
	public function open(){
		this.fsm_.post("open");
	}

	
}