#pragma strict


class WildCloseState extends State{
	private var wildClose_:Function = null;
	function WildCloseState(wildClose:Function){
		wildClose_ = wildClose;
	}
	
	
	function start(){
		wildClose_();
	}
	function over(){
	}
	function postEvent(evt:FSMEvent) {
		if(evt.msg == "empty") {
			return "empty";
		}else if(evt.msg == "open.wild"){
			return "open.wild";
		}else if(evt.msg == "select"){
			return "select.wild";
		}	
		return "";	
	}
};

