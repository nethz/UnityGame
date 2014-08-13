#pragma strict
class EZWeixinLogic  extends MonoBehaviour{
	private var fsm_:FSM = new FSM();
	public var ctrl_:EZWeixinCtrl = null;
	public function Start(){
	
		fsm_.addState("load", new EZWeixinLoadState(), "");
		fsm_.addState("check", new EZWeixinCheckState(), "");
		fsm_.addState("error", new EZWeixinErrorState(ctrl_), "");
		fsm_.addState("change", new EZWeixinChangeState(ctrl_), "");
		fsm_.addState("bind", new EZWeixinBindState(ctrl_), "");
	
		fsm_.addState("go.logo", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Switch)), "");
		fsm_.init("load");
	}
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
}