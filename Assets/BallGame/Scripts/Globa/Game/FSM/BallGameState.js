#pragma strict


class BallGameState extends State{
	private var time_:float = 0;
	function BallGameState(){
	}
	function start(){
		this.time_ = 0;
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName("BallGame");
		ActionManager.Run(act);
		
	}
	
	
};

