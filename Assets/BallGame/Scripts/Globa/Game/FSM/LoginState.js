#pragma strict

class LoginState extends State{
	private var isOver_:boolean = false;
	private var webState_:Geek.WebState;
	
	
	function start(){
		var self = this;
	}
	 
	function over(){
		//TaskManager.instance().runner.killAll();
	}
	
	function update(d:float){
		if(this.isOver_)
		{
			if(this.webState_ == Geek.WebState.Registered)
				return "ball.game";
		}
		
		return "";
	}
	
};

