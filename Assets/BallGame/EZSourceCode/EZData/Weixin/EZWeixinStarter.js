#pragma strict
class EZWeixinStarter extends MonoBehaviour{
	
	public var _ok:String = "ok";
	public var _bind:String = "bind";
	public var _cancel:String = "cancel";
	
	public var _login:String = "weixin";
	public var _find:String = "weixin";
	public var _crystal:boolean = true;
	public var _invitation:boolean = true;
	public var _ignore:boolean = false;
	public var _ignoreText:String = "ignore";
	function Awake(){ 
		
	}
	function ignore():boolean{
		if(_ignore){
			var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			warning.addText(_ignoreText);
			TaskManager.Run(warning);
			return true;
		}
			
		
		return false;
	}
	
	function day(){
		var table:EZMessageBagTable = EZMessageBagTable.GetInstance();
		var day = table.day();
		TaskManager.PushBack(day, function(){
		
			Geek.SendMessage("receive_day", null, SendMessageOptions.DontRequireReceiver);
			//var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			//if(target){
			//	target.SendMessage("receive_day", SendMessageOptions.DontRequireReceiver);
			//}
		});
		TaskManager.Run(day);
	
	}
	function find(id:String){
		if(ignore()){
			return;
		}
		var window:EZWindowTask = TaskManager.Create("weixin.ui.window") as EZWindowTask;
		window.text = _find;
		window.ok = _ok;
		window.cancel = _cancel;
		TaskManager.PushFront(window, function(){
			
			//var target:GameObject
		
			Geek.SendMessage("pause", null, SendMessageOptions.DontRequireReceiver);
			
			
		
		});
		TaskManager.PushBack(window, function(){ 
		
		
				if(window.okOrCancel){ 
					var table:EZWeixinTable = EZWeixinTable.GetInstance(); 
					table.weixinId = id;
					Geek.SendMessage("weixin", null, SendMessageOptions.DontRequireReceiver);
					
				}else{
					Geek.SendMessage("goon", null, SendMessageOptions.DontRequireReceiver);
				}
				
					
			
			
			
		
		});
		TaskManager.Run(window);
	}
	function bind(id:String){
		if(ignore()){
			return;
		}
		Debug.Log("is bind");
		var window:EZWindowTask = TaskManager.Create("weixin.ui.window") as EZWindowTask;
		window.text = _login;
		
		Debug.Log("is bind0");
		window.ok = _bind;
		Debug.Log("is bind1");
		window.cancel = _cancel;
		TaskManager.PushFront(window, function(){
			  
			Debug.Log("is bind3");
			Geek.SendMessage("pause", null, SendMessageOptions.DontRequireReceiver);
				
			Debug.Log("is bind4");
	
			
		
		});
		TaskManager.PushBack(window, function(){ 
		
				if(window.okOrCancel){ 
					var table:EZWeixinTable = EZWeixinTable.GetInstance(); 
					table.weixinId = id;
					Geek.SendMessage("weixin", null, SendMessageOptions.DontRequireReceiver);
					
				}else{
					Geek.SendMessage("goon", null, SendMessageOptions.DontRequireReceiver);
				}
			
		
		});
		TaskManager.Run(window);
	}
	
	function becomeActive(){
		Geek.SendMessage("becomeActive", null, SendMessageOptions.DontRequireReceiver);
		//var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
		//if(target){
		//		target.SendMessage("becomeActive", SendMessageOptions.DontRequireReceiver);
		//}
	}
	function receiveCrystal(crystal:JsonData.WeixinCrystal){ 
		if(_crystal == false){
	 	 	return;
	 	 }
		if(crystal == null){
			return;
		}
		
		
		var table:EZWeixinTable = EZWeixinTable.GetInstance();
		
		
		var receive:Task = table.receiveCrystal(crystal);
		
		TaskManager.PushFront(receive, function(){
			//var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			//if(target){
				//target.SendMessage("pause", SendMessageOptions.DontRequireReceiver);
				Geek.SendMessage("pause", null, SendMessageOptions.DontRequireReceiver);
			//}
		});
		TaskManager.PushBack(receive, function(){ 
		
			Geek.SendMessage("receive_crystal", null, SendMessageOptions.DontRequireReceiver);
		
			Geek.SendMessage("goon", null, SendMessageOptions.DontRequireReceiver);
			//var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			//if(target){
				
			//	target.SendMessage("receive_crystal", SendMessageOptions.DontRequireReceiver);
		//		target.SendMessage("goon", SendMessageOptions.DontRequireReceiver);
				
		//	}
		
		});
		TaskManager.Run(receive);
		
		
		
		/*if(_crystal == false){
	 	 	return;
	 	 }
		if(crystal == null){
			return;
		}
		var table:EZMagicBallTable = EZMagicBallTable.GetInstance();
		var receive = table._receive(crystal);
		TaskManager.PushFront(receive, function(){
			
			var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			if(target){
				target.SendMessage("pause", SendMessageOptions.DontRequireReceiver);
			}
			
		
		});
		TaskManager.PushBack(receive, function(){ 
			var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			if(target){
				
				target.SendMessage("receive_crystal", SendMessageOptions.DontRequireReceiver);
				target.SendMessage("goon", SendMessageOptions.DontRequireReceiver);
				
			}
		
		});
		TaskManager.Run(receive);
		*/
	}
	


	function receiveInvitation(invitation:JsonData.Invitation){
	 	if(_invitation == false){
	 	 	return;
	 	}
		if(invitation == null){
			return;
		}
		
		var table:EZWeixinTable = EZWeixinTable.GetInstance();
		var receive:Task = table.receiveInvitation(invitation);
		
		
		TaskManager.PushFront(receive, function(){
		
			Geek.SendMessage("pause", null, SendMessageOptions.DontRequireReceiver);
		//	var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
		//	if(target){
		//		target.SendMessage("pause", SendMessageOptions.DontRequireReceiver);
		//	}
		});
		TaskManager.PushBack(receive, function(){
		
		
			Geek.SendMessage("receive_invitation", null, SendMessageOptions.DontRequireReceiver);
			
			Geek.SendMessage("goon", null, SendMessageOptions.DontRequireReceiver);
			//var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			//if(target){
			
			//	target.SendMessage("receive_invitation", SendMessageOptions.DontRequireReceiver);
		//		target.SendMessage("goon", SendMessageOptions.DontRequireReceiver);
		//	}
			
		});
		
		
		/*
		TaskManager.PushBack(receive, function(){
			var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			if(target){
				target.SendMessage("receive_invitation", SendMessageOptions.DontRequireReceiver);
			}
		});*/
		TaskManager.Run(receive);
	}
	//function weixinFail(error:String){
	
	//	var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
	//	if(target){
	//		Debug.Log("weixin_error:" + error);
	//		target.SendMessage("weixin_fail",error, SendMessageOptions.DontRequireReceiver);
	//	}
	
	//}

}
