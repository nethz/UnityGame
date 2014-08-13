#pragma strict

class EZGroupState extends State{
	private var task:EZGroupTask = null;
	private var ctrl_:EZBallCtrl = null;
	function EZGroupState(ctrl:EZBallCtrl){
		ctrl_ = ctrl;
	
	}
	function constructed(){
		this.task = TaskManager.instance().factories.createTask("puzzle.group") as EZGroupTask; 
	}
	function start(){
		TaskManager.Run(this.task);
	}
	function update(d:float){
		if(task.success()){
			return "remove";
		}else{
			ctrl_.groupOver();
			return "curtain";
		}
	}
	function postEvent(evt:FSMEvent) {
	};
};

