#pragma strict
class EZTest extends StateWithEventMap{
	private var name_:String;
	public function EZTest(name:String){
		name_ = name;
	}
	
	public function start(){
		Debug.Log(name_ + " start");
	}
	public function over(){
		
		Debug.Log(name_ + " over");
	}
}
class EZFSMTest extends MonoBehaviour{
	public var _debug:boolean = false;
	private var fsm_:FSM;
	public function Awake(){
		this.fsm_ = new FSM();
		this.fsm_.addState("test1", new EZTest("test1"), "");
		var test2 = new EZTest("test2");
		this.fsm_.addState("test2", test2, "test1"); 
		
		test2.addEvent("a", "test3");
		this.fsm_.addState("test3", new EZTest("test3"), "test1");
	
		
	} 
	
	public function Start(){
		this.fsm_.init("test2"); 
		this.fsm_.post("a");
	}
	
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
}