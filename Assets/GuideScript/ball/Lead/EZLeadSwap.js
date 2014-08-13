#pragma strict

class EZLeadSwap extends MonoBehaviour{
	public var _ctrl:EZLeadCtrl = null;
	private var fsm_:FSM = new FSM();
	public function Awake(){
		fsm_.addState("close", new EZLeadSwapClose(_ctrl), "");
		fsm_.addState("open", new EZLeadSwapOpen(_ctrl), "");
		fsm_.addState("dialog", new EZLeadSwapDialog(_ctrl), "open");
		fsm_.addState("battle", new EZLeadSwapBattle(_ctrl), "open");
		fsm_.addState("bag1", new EZLeadSwapBag1(_ctrl), "open");
		fsm_.addState("hide", new EZLeadInfoHide(_ctrl), "open");
		
	
	}
	
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function touch(id:String){
		fsm_.post(id);
	}
	public function Start(){
		fsm_.init("close");
	}
	
	public function open(){
		
		fsm_.post("open");
	
	}
	public function close(){
		fsm_.post("close");
	}
	
}