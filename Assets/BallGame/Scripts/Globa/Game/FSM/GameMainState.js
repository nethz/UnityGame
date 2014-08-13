#pragma strict


class GameMainState extends State{
	private var time_:float = 0;
	
	function GameMainState(){
		
	}
	function start(){
		this.time_ = 0;
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName("game.main");
		ActionManager.Run(act);
	}
	
	function over(){
	}
	
	function update(d:float){
		this.time_ += d;
		if(this.time_ > 2){
			return "link.switch";
		}
		return "";
	}
	
};

