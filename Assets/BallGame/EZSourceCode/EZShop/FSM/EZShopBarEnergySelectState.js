#pragma strict

class EZShopBarEnergySelectState extends StateWithEventMap{
	public var goWeb_:boolean = false;
	public var goNormal_:boolean = false;
	public var ctrl_:EZShopEnergyCtrl = null;
	
	public function EZShopBarEnergySelectState(ctrl:EZShopEnergyCtrl){
		ctrl_ = ctrl;
	
	}
	public function start(){
		goWeb_ = false;
		goNormal_ = false;
		var task:EZWindowTask = ctrl_.getWindowTask();//TaskManager.Create("global.ui.window") as EZWindowTask;
		//task.text = EZDictionary.LookUp("!full_ap");
		////task.ok = EZDictionary.LookUp("!full");
		//task.cancel = EZDictionary.LookUp("!cancel");
		TaskManager.PushBack(task, function(){
			if(task.okOrCancel){
				goWeb_ = true;
			}else{
				goNormal_ = true;
			}
		});
		TaskManager.Run(task);
	}
	public function update(d:float):String{
		if(goNormal_){
			return "shop.bar.normal";
		}
		if(goWeb_){
			return "shop.bar.energy.web";
		}
		return "";
	}
	public function over(){
		
	}
}