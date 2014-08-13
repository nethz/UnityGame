#pragma strict

class MissionEventInState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var isOver_:boolean = false;
	public function MissionEventInState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		ctrl_.inputClose();
		var task:Task = ctrl_.openTask(MissionCtrl.Face.Evt);
		TaskManager.PushBack(task, function(){
			isOver_  = true;
		});
		TaskManager.Run(task);
	}
	public function update(d:float){
		if(isOver_){
			return "event.main";
		}
		return "";
	}
	public function over(){
		
		ctrl_.inputOpen();
	}

}