#pragma strict

class WildState extends State{
	var empty_:Function = null;
	function WildState(empty:Function){
		this.empty_= empty;
	}
	
	
	function start(){
	}
	function over(){

		this.empty_();
	}
	
	function update(d:float){
	
	}
	function postEvent(evt:FSMEvent) {
	
		if(evt.msg == "empty")
		{
			return "empty";
		}
		return "";
	}
};

