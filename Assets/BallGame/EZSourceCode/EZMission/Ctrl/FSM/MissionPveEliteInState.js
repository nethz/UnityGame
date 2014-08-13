#pragma strict

class MissionPveEliteInState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var isOver_:boolean = false;
	public function MissionPveEliteInState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.Log("<============MissionPveEliteInState================>");
		isOver_ = false;
		ctrl_.elite = true;
		ctrl_.inputClose();
		ctrl_.switchBtn.activeElite();
		TaskManager.Run(ctrl_._bg.changeColorHardTask());
		var task:Task = ctrl_.openTask(MissionCtrl.Face.PveElite);
		TaskManager.PushBack(task, function(){
			isOver_  = true;
		});
		TaskManager.Run(task);
	}
	public function update(d:float){
		if(isOver_){
			return "pve.eliteMain";
		}
		return "";
	}
	public function over(){
		
		ctrl_.inputOpen();
	}

}