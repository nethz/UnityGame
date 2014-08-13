#pragma strict


class WildOpenState extends State{
	private var open_:Function = null;
	function WildOpenState(open:Function){
		open_ = open;
	}
	
	
	function start(){
		
		open_();
	}
	function over(){
	}
	
	function postEvent(evt:FSMEvent) {
		if(evt.msg == "close") {
			return "close.wild";
		}else if(evt.msg == "select"){
			return "select.wild";
		}	
		return "";	
	}
};

