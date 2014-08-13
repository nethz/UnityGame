#pragma strict
/*
class SettingFailState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	private var isOver_:boolean = false;
	
	public function SettingFailState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		var task:Task = ctrl_.weixinFailTask();
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
	}
	
	public function update(d:float):String{
		if(isOver_){
			return "setup.main";
		}
		return "";
	
	}
	public function over(){
	
	
	}
	
}*/