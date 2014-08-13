#pragma strict


class WildSelectState extends State{
	var select_:Function = null;
	function WildSelectState(select:Function){
		this.select_ = select;
	}
	
	
	function start(){
		this.select_();
	}
	function over(){
	}
	
	function postEvent(evt:FSMEvent) {
		if(evt.msg == "close") {
			return "close.wild";
        }else if(evt.msg == "open.wild" || evt.msg == "select" ){
        	return "open.wild";
        
        }		
        
        return "";
	}
};

