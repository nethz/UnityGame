#pragma strict

class EZUserState extends State{
	function start(){
	}
	function over(){
	
	
	}
	
	function postEvent(evt:FSMEvent){
		var ret:String = "";
		switch(evt.msg){
			case "locking":
				evt.execute();
				break;
			case "moving":
				ret = "moving";
				break;
			case "ignore":
				ret = "curtain";
				break;
			case "game_over":
				ret = "game_over";
				break;
		}
		return ret;
	
	
	}


}