#pragma strict


class GameOverState extends State{
	private var time_:float = 0;
	
	function start(){
		Debug.Log("HHHHHHHHHHHHHHHHHHH");
		this.time_ = 0;
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName("EZFinish");
		ActionManager.Run(act);
		
	}
	
	function over(){
		
	}
	
	function update(d:float){
		this.time_ += d;
		if(this.time_ > 2){
			return "lobby.home";
		}
		return "";
	}
}