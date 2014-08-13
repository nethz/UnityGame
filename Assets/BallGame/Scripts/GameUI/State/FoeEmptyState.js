#pragma strict


class FoeEmptyState extends State{
	var empty_:Function = null;
	function FoeEmptyState(empty:Function){
		this.empty_= empty;
	}
	
	
	function start(){
		this.empty_();
	}
	function over(){
	}
	
	function update(d:float){
	
	}
	function postEvent(evt:FSMEvent) {
	
		if(evt.msg == "open.wild")
		{
			return "open.wild";
		}else if(evt.msg == "open.rival"){
			return "open.rival";
		}
		return "";
	}
};

