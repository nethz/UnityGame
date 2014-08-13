#pragma strict

class EZFoeInput extends EZInput{
	private var fsm_:FSM = null;
	
	public function Awake(){ 
		this.fsm_ = new FSM();
	} 
	 
	public function OnDestroy(){
	}
	
	public function open(){
		this.fsm_.post("enable");
	}
	
	
	public function info(){
		this.fsm_.post("info");
	}
	public function close(){
		this.fsm_.post("disable");
	}
	public function Start(){
		this.fsm_.addState("close", new EZInputCloseState(function(){this.enable = false;}), "");
		this.fsm_.addState("open", new EZInputOpenState(function(){this.enable = true;}), "");
		this.fsm_.addState("open.info", new EZInputFoeInfoState(), "open");
		this.fsm_.addState("open.normal", new EZInputFoeNormalState(), "open");
		this.fsm_.init("close");
	}
	
	public function Update(){
		super.Update();
		this.fsm_.update(Time.deltaTime);
	}
	public function onShort(id:String){
		this.fsm_.post("short." + id);
		Debug.Log("short:" + id);
	} 
	public function onLongRelease(){
		Debug.Log("release:");
		this.fsm_.post("release");
	
	}
	public function onLong(id:String){
		Debug.Log("long:" + id);
		this.fsm_.post("long." + id);
		
		
	}
	
	
	private function getID(name:String){
		var id:int = 3;
		switch(name){
		case "Battle":
			id = 3;
			break;
		case "Bag1": 
			id = 4;
			break;
		case "Bag2":
			id = 5;
			break;
		}
		return id;
	}
	public function onAction(id:String, state:boolean){
		if(state){
			if(this.enable_){
				var doTouch:EZIDAction = ActionManager.Create("view.pet.touch") as EZIDAction;
				doTouch.id = getID(id); 
				ActionManager.Run(doTouch);
			}
		}else{
			var doOut:EZIDAction = ActionManager.Create("view.pet.out") as EZIDAction;
			doOut.id = getID(id); 
			ActionManager.Run(doOut);
		//.	TaskManager.Run(th2);
		}
		
	}
	
}