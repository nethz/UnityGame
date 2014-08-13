#pragma strict

class EZLogoLoginState extends State{

	private var isOver_:boolean = false;
	
	
	function start(){
		Debug.Log("link login...");
	
		var login:WebLoaderTask = EZUserTable.GetInstance().login();
		isOver_ = false;
		TaskManager.PushBack(login, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(login);
	}

	function update(d:float):String{
		if(isOver_){
			return "check";
		}
		return "";
		
	}
}