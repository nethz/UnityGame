#pragma strict


class UIOpenState extends State{
	private var open_:Function = null;
	function UIOpenState(open:Function){
		open_ = open;
	}
	
	
	function start(){
		open_();
	}
	function over(){
	}
	
	function postEvent(evt:FSMEvent) {
//		DebugStreamer.Log(evt.msg);
		if(evt.msg == "close") {
			return "close";
		}else if(evt.msg == "change"){
			return "change";
		}		
		return "";
	}
};

