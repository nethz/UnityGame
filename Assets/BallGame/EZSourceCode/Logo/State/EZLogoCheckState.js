#pragma strict

class EZLogoCheckState extends State{
	private var fail_:boolean = false;
	private var succeed_:boolean = false;
	private var ctrl_:EZLogoCtrl = null;
	function EZLogoCheckState(ctrl:EZLogoCtrl){
		ctrl_ = ctrl;
	}
	
	
	function start(){
		Debug.Log("link check..."); 
		fail_ = false; 
		succeed_ = false;
		var table:EZUserTable = EZUserTable.GetInstance();
		 
		if(table.isLogin){
			var check:Task = table.check();
			TaskManager.PushBack(check, function(){
				if(table.isLogin){
					succeed_ = true;
				}else{
					fail();
				}
			});
			TaskManager.Run(check);
		}else{
			fail();
		}
	}
	function fail(){
		var noLogin:Task = ctrl_.noLoginTask();
		TaskManager.PushBack(noLogin, function(){
			 fail_ = true;
		}); 
		TaskManager.Run(noLogin);
	
	}
	
	function update(d:float):String{
		if(fail_){
			return "switch";
		}else if(succeed_){
			return "touch";
		}
		return "";
		
	}

}