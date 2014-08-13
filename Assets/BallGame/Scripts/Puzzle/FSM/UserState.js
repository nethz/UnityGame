#pragma strict

class UserState extends State{
	
	function start(){
		//ActionManager.Run("ui.open");
	}
	function over(){
		//ActionManager.Run("ui.close");
	}
	function postEvent(evt:FSMEvent) {
		
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
		}
		
		return ret;
	};
	
	
};
