#pragma strict


class UIChangeState extends State{
	var change_:Function = null;
	function UIChangeState(change:Function){
		this.change_ = change;
	}
	
	
	function start(){
		this.change_();
	}
	function over(){
	}
	
	function postEvent(evt:FSMEvent) {
		if(evt.msg == "close") {
			return "close";
        }else if(evt.msg == "open" || evt.msg == "change" ){
        	return "open";
        
        }		
        return "";
	}
};

