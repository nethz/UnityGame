#pragma strict


class GameHomeState extends StateWithEventMap{
	function GameHomeState(){
		addEvent("quest", "lobby.quest");
		addEvent("pet", "lobby.bag");
	}
	function start(){
		
		Debug.Log("Game Home Start!");
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home));
		ActionManager.Run(act);
	}
	

	
	function end(){
		Debug.Log("Game Home End!");
	}
}