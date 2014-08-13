#pragma strict

class EZQuestLevelState extends StateWithEventMap{
	var ctrl_:QuestCtrl = null;
	var isOver_:boolean  = false;
	
	public function EZQuestLevelState(ctrl:QuestCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
	
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "minor";
		}
		return "";
	}
	public function over(){
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		TaskManager.Run(loaded);
	
	}

}