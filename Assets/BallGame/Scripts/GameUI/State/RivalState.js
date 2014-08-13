#pragma strict


class RivalState extends State{
	private var empty_:Function = null;
	function RivalState(empty:Function){
		empty_ = empty;
	}
	
	
	function start(){
		
	}
	function over(){
		empty_();
	}
	
	function postEvent(evt:FSMEvent) {
		if(evt.msg == "empty") {
			return "empty";
		}	
		return "";
	}
};

