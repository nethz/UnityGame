#pragma strict


class GameQuestState extends StateWithEventMap{
	function GameQuestState(){
		addEvent("back", "lobby.home");
		addEvent("play", "game.play");
	}
	function start(){
	
		Debug.Log("Game Quest State!");
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Quest));
		ActionManager.Run(act);
		
	}
	function end(){
		Debug.Log("Game Quest End!");
	}
}