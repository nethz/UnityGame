#pragma strict

class EZLogoSwitchState extends State{

	function EZLogoSwitchState(){
	}
	
	
	function start(){
		Debug.Log("link switch...");
	
	}
	 
	function over(){
		
	}
	
	function update(d:float):String{
		var data:JsonData.UserData = EZUserTable.GetInstance().data;
		if(data.check()){
			return "login";
		}
		return "register";
		
	}
}