#pragma strict

class MissionLogic extends MonoBehaviour{
	public var _ctrl:MissionCtrl = null;
	
	private var fsm_:FSM;
	public function Start(){ 
		fsm_.addState("load", new MissionLoadState(_ctrl), "");
		fsm_.addState("play", new MissionPlayState(_ctrl), "");
		fsm_.addState("out", new MissionOutState(_ctrl), "");
		fsm_.addState("lobby", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "out");
		fsm_.addState("shop", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Shop)), "out");
		fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "out");
		fsm_.addState("pet", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet)), "out");
		
		fsm_.addState("pve", new MissionPveState(_ctrl), "play");
		fsm_.addState("pve.main", new MissionPveMainState(_ctrl), "pve");
		fsm_.addState("pve.eliteMain", new MissionPveMainEliteState(_ctrl), "pve");
		fsm_.addState("pve.in", new MissionPveInState(_ctrl), "pve");
		fsm_.addState("pve.eliteIn", new MissionPveEliteInState(_ctrl), "pve");
		fsm_.addState("pve.level.in", new MissionPveLevelInState(_ctrl), "pve");
		fsm_.addState("pve.level.main", new MissionPveLevelMainState(_ctrl), "pve");
		
		fsm_.addState("event", new MissionEventState(_ctrl), "play");
		fsm_.addState("event.main", new MissionEventMainState(_ctrl), "event");
		fsm_.addState("event.in", new MissionEventInState(_ctrl), "event");
		fsm_.addState("level", new MissionLevelState(_ctrl), "play");
		
	
		fsm_.init("load");
	}
	
	public function Awake(){
		fsm_ = new FSM();
	}
	
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function weixin(){
		fsm_.post("weixin");
	}
	public function OnAction(action:String){
		fsm_.post(action);
	}
	public function unfold(){
		fsm_.post("unfold");
	}
	public function fold(){
		fsm_.post("fold");
	}
	public function OnEvent(obj:GameObject){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "object";
		evt.obj = obj;
		fsm_.postEvent(evt);
	}
}