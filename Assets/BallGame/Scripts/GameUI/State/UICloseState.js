#pragma strict


class UICloseState extends State{
	var close_:Function = null;
	function UICloseState(close:Function){
		this.close_= close;
	}
	
	
	function start(){
		this.close_();
	}
	function over(){
	}
	
	function update(d:float){
	
	}
	function postEvent(evt:FSMEvent) {
	
		if(evt.msg == "open")
		{
			return "open";
		}
		return "";
	}
};

