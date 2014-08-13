#pragma strict

class SettingMarkState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	
	
	public function SettingMarkState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
		addEvent("close", "setup.main");
		//var tl:TaskList = new TaskList();
		
		//TaskManager.Run(tl);
	}
	
	public function start(){
		ctrl_.mark.open();
	} 
	public function over(){
		ctrl_.mark.close();
	}
	/*public function update(d:float){
		if(isOver_){
			return "setup.main";
		}
		return "";
	}*/
}