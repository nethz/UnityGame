#pragma strict


class RivalCloseState extends State{
	private var close_:Function = null;
	function RivalCloseState(close:Function){
		close_ = close;
	}
	
	
	function start(){
		
		close_();
	}
	function over(){
	}
	
	function postEvent(evt:FSMEvent) {
		if(evt.msg == "open.rival") {
			return "open.rival";
		}	
		return "";	
	}
};

