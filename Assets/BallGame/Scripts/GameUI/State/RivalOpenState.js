#pragma strict


class RivalOpenState extends State{
	private var open_:Function = null;
	function RivalOpenState(open:Function){
		open_ = open;
	}
	
	
	function start(){
		
		open_();
	}
	function over(){
	}
	
	function postEvent(evt:FSMEvent) {
	
		if(evt.msg == "change.rival") {
			return "change.rival";
		}else if(evt.msg == "open.rival" || evt.msg == "close"){
			return "open.rival";
		}
		
		return "";
		
	}
};

