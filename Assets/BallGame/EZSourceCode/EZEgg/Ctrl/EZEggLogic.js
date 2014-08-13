#pragma strict

class EZEggLogic extends MonoBehaviour{
	
	
	public var _ctrl:EZEggCtrl = null;
	private var fsm_:FSM = null;
	public function Awake(){
		fsm_ = new FSM();
	}
	
	public function Start(){ 
		fsm_.addState("load", new EZEggLoadState(_ctrl), "");
		fsm_.addState("egg", new EZEggState(_ctrl), "");
		
		fsm_.addState("egg.main", new EZEggMainState(_ctrl), "egg");
		fsm_.addState("egg.main.input", new EZEggMainInputState(_ctrl), "egg.main");
		fsm_.addState("egg.main.money", new EZEggMainMoneyState(_ctrl), "egg.main");
		fsm_.addState("egg.main.diamond", new EZEggMainDiamondState(_ctrl), "egg.main");
		
		fsm_.addState("egg.main.web", new EZEggWebState(_ctrl), "egg.main");
		
		
			
		fsm_.addState("egg.draw", new EZEggAnimaState(_ctrl), "egg");
		
		fsm_.addState("go.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		fsm_.addState("go.shop", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Shop)), "");
		fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		fsm_.addState("go.petInfo", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet),"info"), "");
		fsm_.addState("go.petSell", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet),"sell"), "");
		fsm_.init("load");
	} 
	public function weixin(){
		fsm_.post("weixin");
	}
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function OnAction(action:String){
		Debug.Log(action);
		fsm_.post(action);
	
	}
	
}