#pragma strict

class SettingSetupState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	private var isOver_:boolean = false;
	
	public function SettingSetupState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
		addEvent("back", "go.home");
		addEvent("weixin", "go.weixin");
	}
	
	
}