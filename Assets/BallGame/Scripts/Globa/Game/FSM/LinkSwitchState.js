#pragma strict

class LinkSwitchState extends State{
	private var isOver_:boolean = false;
	private var webState_:Geek.WebState;
	
	
	function LinkSwitchState(){
	}
	
	
	function start(){
	
	}
	 
	function over(){
		
	}
	
	function update(d:float){
	
		var login:EZLoginTable = EZLoginTable.GetInstance();
		if(login.filled()){
			return "link.login";
		}
		return "link.server";
	}
	
};

