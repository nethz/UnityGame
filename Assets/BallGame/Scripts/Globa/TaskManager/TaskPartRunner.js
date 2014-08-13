#pragma strict


class TaskPartRunner extends TaskRunner{
	
	private var isLined_:boolean = false;
	function Awake(){	
		super.Awake(); 
		if(TaskManager.instance() != null){
			TaskManager.instance().partRunner = this;
			isLined_ = true;
		}
		
	} 
	function Start(){
		if(!isLined_){
			TaskManager.instance().partRunner = this;
			isLined_ = true;
		}
	
	}
	
	
	function Update() { 
		super.Update();
	}
	function OnDestroy(){
		if(isLined_) 
		{
			TaskManager.instance().partRunner = null; 
			isLined_ = false;
		}
	
	}
};

