#pragma strict
/*
class GameManagerBind  extends MonoBehaviour{
	
	private var fsm_:FSM = null;
	//public var _webTasks:WebTaskFactories;
	
	function Awake(){
		AutoSize.getInstance().planning(Screen.width, Screen.height);
		ActionManager.registerAction("game.load.level", loadLevel);
		
	} 
	function OnDestroy(){
		 ActionManager.unregisterAction("game.load.level");
	}
	function loadLevel():ActionObj{
		var action:LoadLevelAction = new LoadLevelAction();
		action.execute = function(){
			if(Application.loadedLevelName != action.levelName)
				Application.LoadLevel(action.levelName);
		};
		
		return action;
	}
	
	function Start () {
		DontDestroyOnLoad(this.gameObject);
		AutoSize.getInstance().planning(Screen.width, Screen.height);
		this.initFSM();
	}
	function initFSM(){
		this.fsm_ = new FSM();
		this.fsm_.addState("game.main", new GameMainState(), "");
		this.fsm_.addState("loading", new LoadingState(), "");
		this.fsm_.addState("ball.game", new BallGameState(), "");
		//this.fsm_.addState("link", new LinkState(), "");
		this.fsm_.addState("link.fail", new LinkFailState(), "link");
		this.fsm_.addState("link.login", new LinkLoginState(), "link");
		this.fsm_.addState("link.register", new LinkRegisterState(), "link");
		this.fsm_.addState("link.check", new LinkCheckState(), "link");
		this.fsm_.addState("link.switch", new LinkSwitchState(), "link");
		this.fsm_.init("game.main");
	}
	function Update () {
		this.fsm_.update(Time.deltaTime);
	}
}*/