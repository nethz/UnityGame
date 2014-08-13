#pragma strict

class EZShopLogic extends MonoBehaviour{

	public var _uiCtrl:EZUICtrl = null;
	public var _bar:EZShopBarCtrl;
	public var _diamond:EZShopDiamondCtrl;
	public var _energy:EZShopEnergyCtrl;
	public var _bag:EZShopBagCtrl;
	public var _loading:EZShopLoadingCtrl;
	public var _canSleep:boolean = false;
	private var fsm_:FSM;
	public function Start(){ 
		fsm_.addState("shop", new EZShopState(_loading), "");
		fsm_.addState("shop.load", new EZShopLoadState(_loading,  _bar), "shop");
		fsm_.addState("shop.bar", new EZShopBarState(_loading, _bar), "shop");
		fsm_.addState("shop.bar.normal", new EZShopBarNormalState(), "shop.bar");
		fsm_.addState("shop.bar.nodiamond", new EZShopBarNoDiamondState(), "shop.bar");
		fsm_.addState("shop.bar.energy", new EZShopBarEnergyState(), "shop.bar");
		
		fsm_.addState("shop.bar.energy.select", new EZShopBarEnergySelectState(_energy), "shop.bar.energy");
		fsm_.addState("shop.bar.energy.web", new  EZShopBarEnergyWebState(_loading), "shop.bar.energy");
		fsm_.addState("shop.diamond", new EZShopDiamondState(_diamond, _loading), "shop");
		
		
		fsm_.addState("shop.bag", new EZShopBagState(_bag), "shop");
		fsm_.addState("shop.bag.normal", new EZShopBagNormalState(_bag), "shop.bag");
		fsm_.addState("shop.bag.money", new EZShopBagWebState("money",_loading), "shop.bag");
		fsm_.addState("shop.bag.nomoney", new EZShopBagNoMoneyState(), "shop.bag");
		fsm_.addState("shop.bag.diamond", new EZShopBagWebState("diamond",_loading), "shop.bag");
		fsm_.addState("shop.bag.nodiamond", new EZShopBagNoDiamondState(), "shop.bag");
		
		fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
	
		if(_canSleep){
			fsm_.addState("go.home", new EZBackHomeState(_uiCtrl), "");
			fsm_.addState("sleep", new EZShopSleepState(), "");
		}else{
			fsm_.addState("go.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		
		}
		//
		
		
		fsm_.init("shop.load");
		
	} 
	public function weixin(){
		fsm_.post("weixin");
	}
	public function onForce(){
		Debug.Log("onForce!!!!");
		fsm_.post("onForce");
	}
	public function outForce(){
		fsm_.post("outForce");
	}
	public function Awake(){
		fsm_ = new FSM();
	}
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function OnAction(action:String){
		Debug.Log(action);
		fsm_.post(action);
	
	}
	
	
	public function payment_over(){
		fsm_.post("reload");
	}
	
}