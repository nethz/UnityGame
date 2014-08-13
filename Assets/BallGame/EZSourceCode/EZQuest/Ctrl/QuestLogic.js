#pragma strict

class QuestLogic extends MonoBehaviour{
	public var _ctrl:QuestCtrl = null;
	
	private var fsm_:FSM;
	public function Start(){ 
	
	
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		guide.quest = true;
		EZGuideTable.GetInstance().save(guide);
		
		fsm_.addState("load", new QuestLoadState(_ctrl), "");
		fsm_.addState("quest",new QuestState(), "");
		fsm_.addState("main",new QuestMainState(_ctrl), "quest");
		fsm_.addState("minorGo",new QuestMinorGoState(_ctrl), "quest");
		fsm_.addState("minor",new QuestMinorState(_ctrl), "quest");
		fsm_.addState("minorBack",new QuestMinorBackState(_ctrl), "quest");
		
			//ctrl_.loadMain();
		fsm_.addState("go.level",new EZQuestLevelState(_ctrl), "");
		fsm_.addState("go.pet",new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet)), "");
		fsm_.addState("go.weixin",new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Weixin)), "");
		fsm_.addState("go.home", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home)), "");
		fsm_.addState("go.mission", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Mission)), "");
		fsm_.addState("go.setting", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Setting)), "");
		fsm_.addState("go.crystal", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Crystal)), "");
		fsm_.addState("go.shop", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Shop)), "");
		fsm_.addState("go.egg", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Egg)), "");
		
		fsm_.init("load");
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
	public function weixin(){
		fsm_.post("weixin");
	}
	public function unfold(){
		fsm_.post("unfold");
	}
	
	public function fold(){
		fsm_.post("fold");
	}
	public function OnEvent(obj:GameObject){
		Debug.Log("objct");
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "object";
		evt.obj = obj;
		fsm_.postEvent(evt);
	}
	
}