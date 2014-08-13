#pragma strict

class LoadingState extends State{
	private var time_:float = 0;
	
	
	
	
	function LoadingState(){
	}
	
	
	function start(){
		this.time_ = 0;
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName("Loading");
		ActionManager.Run(act);
	}
	
	function over(){
		//TaskManager.instance().runner.killAll();
		//TaskManager.instance().factories.clear();
	}
	
	function update(d:float){
		
		
		this.time_ += d;
		if(this.time_ >2)
		{
			return "ball.game";
		}
		return "";
	
	}
	
};

