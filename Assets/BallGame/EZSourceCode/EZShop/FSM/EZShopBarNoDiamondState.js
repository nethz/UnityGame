#pragma strict

class EZShopBarNoDiamondState extends StateWithEventMap{
	public var goDiamond_:boolean = false;
	public var goNormal_:boolean = false;
	public function start(){
		goDiamond_ = false;
		goNormal_ = false;
		var task:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		task.text = EZDictionary.LookUp("!need_recharge");
		task.ok = EZDictionary.LookUp("!recharge");
		task.cancel = EZDictionary.LookUp("!cancel");
		TaskManager.PushBack(task, function(){
			if(task.okOrCancel){
				goDiamond_ = true;
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
		if(goDiamond_){
			return "shop.diamond";
		}
		return "";
	}
	public function over(){
		
	}
}