#pragma strict

class EZCryLogic extends MonoBehaviour{
	public var _normal:EZCryNormalCtrl;
	public var _comp:EZCryCompCtrl;
	private var fsm_:FSM;
	
	public function Awake(){
		fsm_ = new FSM();
	}
	public function weixin(){
		fsm_.post("weixin");
	}
	public function Start(){
	
		fsm_.addState("load", new EZCryLoadState(_normal), "");
		fsm_.addState("normal", new EZCryNormalState(_normal), "");
		fsm_.addState("go.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		fsm_.addState("normal.select", new EZCryNormalSelectState(_normal), "normal");
		fsm_.addState("normal.give", new EZCryNormalGiveState(_normal), "normal");
		
		fsm_.addState("normal.give.decision", new EZCryNormalGiveDecisionState(_normal), "normal.give");
		fsm_.addState("normal.give.do", new EZCryNormalGiveDoState(_normal), "normal.give");
		fsm_.addState("comp", new EZCryCompState(_comp), "");
		fsm_.addState("comp.select", new EZCryCompSelectState(_comp), "comp");
		fsm_.addState("comp.web", new EZCryCompWebState(_comp), "comp");
		fsm_.addState("comp.animation", new EZCryCompAnimationState(_comp), "comp");
		
		fsm_.init("load");
	}
	
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	
	}
	
	public function OnAction(action:String){
		Debug.Log(action);
		fsm_.post(action);
	}
	public function OnBall(obj:GameObject){
		
		Debug.Log(obj.name);
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "ball";
		evt.obj = obj;
		fsm_.postEvent(evt);
	}
	
	
	public function OnSpell(obj:GameObject){
		Debug.Log(obj.name + "spell");
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "spell";
		evt.obj = obj;
		fsm_.postEvent(evt);
	}
	
	public function OnEvent(obj:GameObject){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "object";
		evt.obj = obj;
		fsm_.postEvent(evt);
	}
}