#pragma strict
/*
class EZLogoLogic  extends MonoBehaviour{

	private var fsm_:FSM = new FSM();
	public var _ctrl:EZLogoCtrl = null;
	public function Start(){
	
		this.fsm_.addState("logo", new EZLogoState(), "");
		this.fsm_.addState("load", new EZLogoLoadState(), "logo");
		this.fsm_.addState("switch", new EZLogoSwitchState(), "logo");
		//this.fsm_.addState("weixin", new EZLogoWeixinState(), "logo");
		this.fsm_.addState("register", new EZLogoRegisterState(), "logo");
		this.fsm_.addState("login", new EZLogoLoginState(), "logo");
		this.fsm_.addState("check", new EZLogoCheckState(_ctrl), "logo");
		this.fsm_.addState("touch", new EZLogoTouchState(_ctrl), "logo");
		this.fsm_.addState("go.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		this.fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		this.fsm_.init("load");
		
	}
	function Update () {
	 	this.fsm_.update(Time.deltaTime);
	}
	function OnAction(action:String){
		this.fsm_.post(action);
	}
	function weixin(){
		this.fsm_.post("weixin");
	}

}*/