#pragma strict

class EZPetLogic extends MonoBehaviour{
	private var fsm_:FSM = null;
	public var _ctrl:EZCardCtrl = null;
	public function Awake(){
		this.fsm_ = new FSM();
	}
	
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	public function OnAction(act:String){
		this.fsm_.post(act); 
	}
	
	public function weixin(){
		this.fsm_.post("weixin");
	}
	public function Start(){
	
		
		this.fsm_.addState("loading", new EZOutPetLoadingState(_ctrl), "");
		this.fsm_.addState("pet", new EZPetState(_ctrl), "");
		
		
		
		
		this.fsm_.addState("info", new EZPetInfoState(_ctrl), "pet");
		this.fsm_.addState("info.input", new EZPetInfoInputState(_ctrl), "info");
		this.fsm_.addState("info.share", new EZPetInfoShareState(_ctrl), "info");
		this.fsm_.addState("info.web", new EZPetInfoWebState(_ctrl), "info");
		
		this.fsm_.addState("team", new EZCardTeamState(_ctrl), "pet");
		
		this.fsm_.addState("team.input", new EZCardTeamInputState(_ctrl), "team");
		
		
		this.fsm_.addState("comp", new EZPetCompState(_ctrl), "pet");
		this.fsm_.addState("comp.input", new EZPetCompInputState(_ctrl), "comp");
		this.fsm_.addState("comp.die", new EZPetCompDieState(), "comp");
		this.fsm_.addState("comp.web", new EZPetCompWebState(_ctrl), "comp");
		
		this.fsm_.addState("sell", new EZPetSellState(_ctrl), "pet");
		this.fsm_.addState("sell.input", new EZPetSellInputState(_ctrl), "sell");
		this.fsm_.addState("sell.web", new EZPetSellWebState(_ctrl), "sell");
		this.fsm_.addState("back", new EZCardGuideOver(_ctrl, "go.to.home"), "");
		this.fsm_.addState("go.weixin", new EZCardGuideOver(_ctrl, "go.to.weixin"), "");
		
		this.fsm_.addState("go.to.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		this.fsm_.addState("go.to.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		this.fsm_.init("loading");
	}
}