#pragma strict


class GameLobbyState extends StateWithEventMap{
	function GameLobbyState(){
		addEvent("play", "game.play");
	}
	function start(){
		Debug.Log("Game Lobby State!");
		
	}
	function end(){
		Debug.Log("Game Lobby End!");
	}
}