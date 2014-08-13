#pragma strict


class RivalChangeState extends State{
	private var change_:Function = null;
	function RivalChangeState(change:Function){
		change_ = change;
	}
	
	
	function start(){
		
		change_();
	}
	function over(){
	}
	 
	function update(d:float){
		return "open.rival";
	}
};

