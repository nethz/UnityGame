#pragma strict

class LinkFailState extends State{

	private var isOver_:boolean = false;
	function start(){
		isOver_ = false;
		//var alert:EZAlertWindow = EZAlertWindow.GetInstance();
		//alert.start(EZAlertWindow.Type.OK, "link?", function(){
		//	isOver_ = true;
		//});
		//var login:DBLogin = DBManager.getInstance().getLogin();
		//login.clean();
		
	}
	 
	function over(){
		
	}
	
	function update(d:float){
		if(isOver_){
			return "link.switch";
		}
		return "";
		
	}
	
};

