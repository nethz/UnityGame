#pragma strict


class GameBagState extends StateWithEventMap{
	function GameBagState(){
		addEvent("back", "lobby.home");
	}
	function start(){
	
		Debug.Log("Game Bag State!");
		var act:LoadLevelAction = ActionManager.Create("game.load.level") as LoadLevelAction;
		act.setLevelName("EZBag");
		ActionManager.Run(act);
		
	}
	function end(){
		Debug.Log("Game Bag End!");
	}
	function postEvent(evt:FSMEvent){
		
		return super.postEvent(evt);
	}
}