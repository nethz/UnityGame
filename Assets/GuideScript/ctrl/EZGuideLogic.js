#pragma strict

class EZGuideLogic extends MonoBehaviour{
	public var _ctrl:EZGuideCtrl = null;
	
	private var fsm_:FSM = null;
	
	public function Awake(){
		this.fsm_ = new FSM();
	}
	
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	
	public function OnAction(act:String){
		Debug.Log("Logic receive: " + act);
		this.fsm_.post(act); 
	}
	
	public function Start(){
		this.fsm_.addState("guide", new EZGuideState(), "");
		this.fsm_.addState("loading", new EZGuideLoadState(_ctrl), "guide");
		this.fsm_.addState("dialogueStart", new DialogueStartState(_ctrl), "guide");
		this.fsm_.addState("dialogue", new DialogueState(_ctrl), "guide");
		this.fsm_.addState("dialogueOver", new DialogueOverState(_ctrl), "guide");
		this.fsm_.addState("puzzle", new EZGuidePuzzleState(_ctrl), "guide");
		this.fsm_.addState("puzzle.in", new EZGuidePuzzleInState(_ctrl), "puzzle");
		this.fsm_.addState("puzzle.play", new EZGuidePuzzlePlayState(_ctrl), "puzzle");
		this.fsm_.addState("puzzle.out", new EZGuidePuzzleOutState(_ctrl), "puzzle");
		this.fsm_.addState("select", new EZGuideSelectState(_ctrl), "guide");
		this.fsm_.addState("go.game", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Game)), "");
		this.fsm_.addState("go.weixin", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		
		this.fsm_.init("loading");
	}
	public function weixin(){
		fsm_.post("weixin");
	}
}