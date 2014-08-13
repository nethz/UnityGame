#pragma strict

class EZSettingLogic extends MonoBehaviour{
	public var _ctrl:EZSettingCtrl = null;
	public var _loaded:boolean = false;
	private var fsm_:FSM;
	
	public var _uiCtrl:EZUICtrl = null;
	
	public var _canSleep:boolean = false;
	
	public function Awake(){
		_loaded = false;
		fsm_ = new FSM();
	}
	public function weixin_fail(error:String){
	
	
	}
	public function Start(){
		fsm_.addState("load",new SettingLoadState(_ctrl), "");
		fsm_.addState("setup",new SettingSetupState(_ctrl), "");
		fsm_.addState("setup.main",new SettingMainState(_ctrl), "setup");
		fsm_.addState("setup.id",new SettingIDState(_ctrl), "setup");
		fsm_.addState("setup.web",new SettingWebState(_ctrl), "setup");
		
		fsm_.addState("setup.invitation",new SettingInvitationState(_ctrl), "setup");
		fsm_.addState("setup.weixin",new SettingWeixinState(_ctrl), "setup");
		fsm_.addState("setup.mark",new SettingMarkState(_ctrl), "setup");
		
		if(_canSleep){
			fsm_.addState("go.home", new EZBackHomeState(_uiCtrl), "");
			fsm_.addState("sleep", new EZSettingSleepState(), "");
		}else{
			fsm_.addState("go.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		}
		
		fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		
		fsm_.init("load");
	}
	
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function OnAction(action:String){
		Debug.Log(action);
		fsm_.post(action);
	
	}
	public function SoundSwitch(state:boolean){
		if(fsm_){
			if(state){
				fsm_.post("sound_on");
			}else{
				fsm_.post("sound_off");
			}
		}
	
	}
	public function weixin(){
		fsm_.post("weixin");
	}
	public function MusicSwitch(state:boolean){
		if(fsm_){
			if(state){
				fsm_.post("music_on");
			}else{
				fsm_.post("music_off");
			}
		}
	}
	
	public function onForce(){
		fsm_.post("onForce");
	}
	public function outForce(){
	
	
		fsm_.post("outForce");
	}

}