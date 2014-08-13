#pragma strict

class MissionPveLevelInState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var isOver_:boolean = false;
	public function MissionPveLevelInState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.Log("MissionPveLevelInState");
		isOver_ = false;
		ctrl_.inputClose();
		var task:Task = ctrl_.openTask(MissionCtrl.Face.PveLevel);
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
		TaskManager.Run(task);
	}
	public function update(d:float):String{
		if(isOver_){
			return "pve.level.main";
		}
		return "";
	}
	public function over(){
		ctrl_.inputOpen();
	}

}