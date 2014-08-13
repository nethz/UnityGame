#pragma strict

class MissionPveInState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var isOver_:boolean = false;
	public function MissionPveInState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		ctrl_.elite = false;
		ctrl_.inputClose();
		var hard:int = EZMissionBagTable.GetInstance().GetHardCount() ;
		if(hard > 0){
			ctrl_.switchBtn.open();
			ctrl_.switchBtn.activeNormal();
			TaskManager.Run(ctrl_._bg.changeColorNomalTask());
		}else{
			ctrl_.switchBtn.close();
		}
		var task:Task = ctrl_.openTask(MissionCtrl.Face.Pve);
		TaskManager.PushBack(task, function(){
			isOver_  = true;
		});
		TaskManager.Run(task);
	}
	public function update(d:float){
		if(isOver_){
			return "pve.main";
		}
		return "";
	}
	public function over(){
		
		ctrl_.inputOpen();
	}

}