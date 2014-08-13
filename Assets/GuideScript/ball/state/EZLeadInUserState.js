#pragma strict

class EZLeadInUserState extends State{
	private var isOver_:boolean = false;
	private var impl_:EZBallsManagerImpl = null;
	public function EZLeadInUserState(impl:EZBallsManagerImpl){
		impl_ = impl;
		
	}
	function start(){
		
		//var lManager:EZLeadManager = EZLeadManager.GetInstance();
		var show:Task = impl_.lead.show(0.5f);
		
		isOver_ = false;
		TaskManager.PushFront(show, function(){
			impl_.leadShine(true);
			impl_.leadFount(true);
		
		});
		TaskManager.PushBack(show, function(){
			isOver_ = true;	
		});
		TaskManager.Run(show);
		
	}
	
	function update(d:float):String{
		if(isOver_){
			return "lead_user";
		}
		return "";
	}


}