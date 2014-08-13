#pragma strict

class EZLobbyLogic extends MonoBehaviour{
	public var _lobby:EZLobbyCtrl = null;
	public var _ui:EZUICtrl = null;
	public function OnAction(act:String){
		fsm_.post(act);
	}
	public var _inShop:boolean = false;
	private var fsm_:FSM = null;
	public function Awake(){
		fsm_ = new FSM();		
	}
	private var loadIap_:boolean = false;
	public function Start(){
		fsm_.addState("switch", EZLobbySwitchState(_lobby), "");
		fsm_.addState("menu", EZLobbyMenuState(_lobby), "");
	
		this.fsm_.addState("menu.select", new EZMenuSelectState(_lobby), "menu");
		this.fsm_.addState("menu.register", new EZMenuRegisterState(_lobby), "menu");
		this.fsm_.addState("menu.login", new EZMenuLoginState(_lobby), "menu");
		this.fsm_.addState("menu.load", new EZMenuLoadState(_lobby), "menu");
		this.fsm_.addState("menu.touch", new EZMenuTouchState(_lobby), "menu");
		
		
		
		fsm_.addState("comeIn", EZLobbyComeInState(_lobby), "");
		
		
		fsm_.addState("play", EZLobbyPlayState(_lobby), "");
		
		fsm_.addState("active", EZLobbyActiveState(_lobby), "");
		
		
		
		fsm_.addState("web.news", EZLobbyNewsState(_lobby, EZMessageBagTable.Mode.News), "");
		fsm_.addState("web.quest", EZLobbyNewsState(_lobby, EZMessageBagTable.Mode.Quest), "");
		fsm_.addState("out", EZLobbyOutState(_lobby), "");
		var task:Task = new Task();
		
		task.isOver = function():boolean{
			//return true;
			//Debug.Log("load iap:" +loadIap_ );
			return loadIap_;
		};
		fsm_.addState("play.mission", EZLobbyPlaySceneState("go.mission", task), "out");
		fsm_.addState("play.shop", EZLobbyPlaySceneState("go.shop", task), "out");
		fsm_.addState("play.quest", EZLobbyPlaySceneState("go.quest", task), "out");
		fsm_.addState("play.setting", EZLobbyPlaySceneState("go.setting", task), "out");
		fsm_.addState("play.crystal", EZLobbyPlaySceneState("go.crystal", task), "out");
		fsm_.addState("play.pet", EZLobbyPlaySceneState("go.pet", task), "out");
		fsm_.addState("play.weixin", EZLobbyPlaySceneState("go.weixin", task), "out");
		fsm_.addState("play.egg", EZLobbyPlaySceneState("go.egg", task), "out");
		
		
		fsm_.addState("go.mission", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Mission)), "out");
		if(_inShop){
		
			fsm_.addState("go.shop", EZLobbyShopInState(_ui), "out");
			fsm_.addState("go.setting", EZLobbySettingInState(_ui), "out");
		
		}else{
			fsm_.addState("go.shop", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Shop)), "out");
			fsm_.addState("go.setting", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Setting)), "out");
		
		}
		
		
		fsm_.addState("back", EZLobbyBackState(_lobby), "");
		fsm_.addState("sleep", EZLobbySleepState(), "");
		fsm_.addState("go.quest", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Quest)), "out");
		fsm_.addState("go.crystal", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Crystal)), "out");
		fsm_.addState("go.pet", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet)), "out");
		fsm_.addState("go.weixin", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "out");
		fsm_.addState("go.egg", EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Egg)), "out");
		
		
	
		fsm_.init("switch");
		var iap:Task = EZShopTable.GetInstance().loadIap();
		TaskManager.PushBack(iap, function(){
			loadIap_ = true;
		});
		TaskManager.Run(iap);
		
	}
	public function weixin(){
		fsm_.post("weixin");
	}
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	
	public function receive_crystal(){
		fsm_.post("receive_message");
	}
	public function receive_invitation(){
		fsm_.post("receive_message");
	}
	public function becomeActive(){
		
		fsm_.post("active");
	}
	public function receive_day(){
		fsm_.post("receive_message");
	}
	public function onForce(){
		
		fsm_.post("onForce");
	}
	public function outForce(){
	
	
		fsm_.post("outForce");
	}

}