#pragma strict

class EZUpdateLogic extends MonoBehaviour{
	public var _ctrl:EZUpdateCtrl = null;
	private var fsm_:FSM = null;
	public function Awake(){
		fsm_ = new FSM();
	}
	public function Start(){
#if UNITY_EDITOR
		fsm_.addState("debug", new EZDebugState(_ctrl), "");
#endif
		fsm_.addState("update", new EZUpdateState(), "");
		fsm_.addState("load", new EZUpdateLoadState(_ctrl), "update");
		fsm_.addState("window", new EZUpdateWindowState(_ctrl), "update");
		//fsm_.addState("shop", new EZUpdateShopState(_ctrl), "update");//this is
		fsm_.addState("switch", new EZUpdateSwitchState(_ctrl), "update");
		fsm_.addState("do", new EZUpdateDoState(_ctrl), "update");
		fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		fsm_.addState("go.guide", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Guide)), "");
		fsm_.addState("go.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		
		
#if UNITY_EDITOR
		fsm_.init("debug");
#else

		fsm_.init("load");
#endif
	}
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	
	public function weixin(){
		this.fsm_.post("weixin");
	}
	
	public function pause(){
		_ctrl.pause = true;
	}
	
	public function goon(){
		_ctrl.pause = false;
	}
	public function OnAction(act:String){
		this.fsm_.post(act); 
	}
	

}