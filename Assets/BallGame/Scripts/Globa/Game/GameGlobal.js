#pragma strict
/*
class GameGlobal extends MonoBehaviour{
	private var fsm_:FSM = null;
	
	function Awake(){
		DontDestroyOnLoad(this.gameObject);
		AutoSize.getInstance().planning(Screen.width, Screen.height);
		ActionManager.registerAction("game.load.level", loadLevel); 
		ActionManager.registerAction("game.post.event", this.postEventAction);
		this.fsm_ = new FSM();
//		this.fsm_.addState("link", new LinkState(), "");
		this.fsm_.addState("link.server", new LinkServerState(), "link");
		this.fsm_.addState("link.fail", new LinkFailState(), "link");
		this.fsm_.addState("link.login", new LinkLoginState(), "link");
		this.fsm_.addState("link.register", new LinkRegisterState(), "link");
		this.fsm_.addState("link.check", new LinkCheckState(), "link");
		this.fsm_.addState("link.switch", new LinkSwitchState(), "link");
		this.fsm_.addState("lobby.main", new GameLobbyState(), "");
		this.fsm_.addState("game.play", new GamePlayState(), "");
		this.fsm_.addState("game.over", new GameOverState(), "");
	} 
	function OnDestroy(){
		 ActionManager.unregisterAction("game.post.event");
		 ActionManager.unregisterAction("game.load.level");
	}
	function loadLevel():ActionObj{
		var action:LoadLevelAction = new LoadLevelAction();
		action.execute = function(){
			if(Application.loadedLevelName != action.levelName)
				EZGlobal.GetInstance().LoadLevel(action.levelName);
		};
		
		return action;
	}
	
	function Start () { 
		this.fsm_.init("link.switch");
	}
	
	function Update () {
	 	this.fsm_.update(Time.deltaTime);
	}
	
	private function postEventAction():ActionObj{
		var postEvent:EventPostAction = new EventPostAction();
		var _evtText:String = "";
		postEvent.post = function(evtText:String){
			_evtText = evtText;
		};
		postEvent.execute = function(){
			this.postEvent(_evtText);
		};
		return postEvent;
	}
	private function postEvent(evtText:String){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = evtText;
		this.fsm_.postEvent(evt);
	
	}
	
	
}*/