#pragma strict

class EZLeadGroupState extends State{
	private var task:EZGroupTask = null;
	private var ctrl_:EZBallCtrl = null;
	private var impl_:EZBallsManagerImpl = null;
	function EZLeadGroupState(ctrl:EZBallCtrl, impl:EZBallsManagerImpl){
		ctrl_ = ctrl;
		impl_ = impl;
	
	}
	function constructed(){
		this.task = TaskManager.instance().factories.createTask("puzzle.group") as EZGroupTask; 
	}
	function start(){
		Debug.Log("<========EZLeadGroupState==========>");
		impl_.leadFount(false);
		TaskManager.Run(this.task);
	}
	function update(d:float){
		if(task.success()){
			return "lead_remove";
		}else{
			ctrl_.groupOver();	
			
			return "curtain";
			
		}
	}
	function postEvent(evt:FSMEvent) {
	};
};

