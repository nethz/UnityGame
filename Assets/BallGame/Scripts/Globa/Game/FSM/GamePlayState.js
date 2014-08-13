#pragma strict


class GamePlayState extends StateWithEventMap{
	//private var time_:float = 0;
	
	public function GamePlayState(){
		addEvent("game.over", "game.over");
	}
	function start(){
		//this.time_ = 0;
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName("EZPlaying");
		ActionManager.Run(act);
	}
	
	function over(){
		
	}
	
	function update(d:float){
	//	this.time_ += d;
		return "";
	}
}