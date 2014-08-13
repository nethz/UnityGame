#pragma strict

class SettingWeixinState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	//private var isOver_:boolean = false;
	
	
	public function SettingWeixinState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
		addEvent("close", "setup.main");
	}
	function postEvent(evt:FSMEvent){
		if(evt.msg == "web"){
			var web:Task  = ctrl_.weixinWeb();
			TaskManager.Run(web);
		}
		return super.postEvent(evt);
	}

	public function start(){
		TaskManager.Run(ctrl_.weixinInfo.loadTask());
	} 
	public function over(){
		ctrl_.weixinInfo.close();
	}
	/*public function update(d:float){
		if(isOver_){
			return "setup.main";
		}
		return "";
	}*/
}