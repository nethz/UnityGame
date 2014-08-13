#pragma strict

class MissionLevelState extends StateWithEventMap{
	var ctrl_:MissionCtrl = null;
	var isOver_:boolean  = false;
	
	public function MissionLevelState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
	
	}
	public function update(d:float):String{
		if(isOver_){
		
			///if(EZGlobal.GetInstance().missionType == EZMissionBagTable.Type.Evt){
			//	EZGlobal.GetInstance().missionType = EZMissionBagTable.Type.Pve;
			//	return "event.in";
			//}
			return "pve.in";
			
		}
		return "";
	}
	public function over(){
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		TaskManager.Run(loaded);
	}

}