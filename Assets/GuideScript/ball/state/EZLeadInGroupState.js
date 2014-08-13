#pragma strict

class EZLeadInGroupState extends State{
	private var isOver_:boolean = false;
	private var impl_:EZBallsManagerImpl = null;
	public function EZLeadInGroupState(impl:EZBallsManagerImpl){
		impl_ = impl;
		
	}
	function start(){
		var hide:Task = impl_.lead.hide(0.3f);
		isOver_ = false;
		TaskManager.PushBack(hide, function(){
			isOver_ = true;	
		});
		TaskManager.Run(hide);
		
	}
	
	function update(d:float):String{
		if(isOver_){
			return "lead_group";
		}
		return "";
	}


}