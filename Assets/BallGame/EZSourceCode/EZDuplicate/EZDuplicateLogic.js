#pragma strict

/*
class EZDuplicateLogic  extends MonoBehaviour{
	
	public var _ctrl:EZDuplicateCtrl;
	private var fsm_:FSM = null;
	
	public function Awake(){
		fsm_= new FSM();
	}
	
	public function OnAction(act:String){
		fsm_.post(act);
	} 
	
	public function OnEvent(obj:GameObject){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "object";
		evt.obj = obj;
		fsm_.postEvent(evt);
	}
	public function Start(){
			
		this.fsm_.addState("loading", new EZDuplicateLoadingState(_ctrl), "");
		
		this.fsm_.addState("pve_wrap", new EZWrapState(function(){ _ctrl.pve = false;_ctrl.pvp = true;_ctrl.event = true;	}, function(){}), "");		
		this.fsm_.addState("pve_in", new EZDuplicatePveInState(_ctrl), "pve_wrap");
		this.fsm_.addState("pve", new EZDuplicatePveState(_ctrl), "pve_wrap");
		this.fsm_.addState("pve_level_in", new EZDuplicateInState(_ctrl, "pve_level", function(){_ctrl.showBackground();}), "pve_wrap");
		this.fsm_.addState("pve_level", new EZDuplicatePveLevelState(_ctrl), "pve_wrap");
		
		this.fsm_.addState("pvp_wrap", new EZWrapState(function(){_ctrl.pve = true;_ctrl.pvp = false;_ctrl.event = true;}, function(){}), "");	
		this.fsm_.addState("pvp_in", new EZDuplicatePvpInState(_ctrl), "pvp_wrap");
		this.fsm_.addState("pvp", new EZDuplicatePvpState(_ctrl), "pvp_wrap");
		this.fsm_.addState("pvp_level_in", new EZDuplicateInState(_ctrl, "pvp_level", function(){_ctrl.showBackground();}), "pvp_wrap");
		this.fsm_.addState("pvp_level", new EZDuplicatePvpLevelState(_ctrl), "pvp_wrap");
		
		this.fsm_.addState("event_warp", new EZWrapState(function(){_ctrl.pve = true;_ctrl.pvp = true;_ctrl.event = false;}, function(){}), "");
		this.fsm_.addState("event_in",new EZDuplicateEventInState(_ctrl),"event_warp");
		this.fsm_.addState("event", new EZDuplicateEventState(_ctrl), "event_warp");
		
		this.fsm_.addState("goto", new EZDuplicateGoto(_ctrl), "");
		this.fsm_.init("loading");
	}
	
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function OnDestroy(){
		
	}
	
}*/