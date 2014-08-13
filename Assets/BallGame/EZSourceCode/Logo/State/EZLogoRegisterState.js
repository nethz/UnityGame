#pragma strict
/*
class EZLogoRegisterState extends State{
	private var isOver_:boolean = false;
	
	function start(){
		Debug.Log("link register...");
		
		var register:WebLoaderTask = EZUserTable.GetInstance().register();
		isOver_ = false;
		TaskManager.PushBack(register, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(register);
	}
	 
	
	function update(d:float):String{
		
		if(isOver_){
			return "check";
		}
		return "";
	}
}
*/