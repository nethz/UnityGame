#pragma strict

class EZShopBagNoDiamondState extends StateWithEventMap{
	private var goNormal_:boolean = true;
	private var goDiamond_:boolean = true;
	
	public function EZShopBagNoDiamondState(){
	
	}
	
	public function start(){
		Debug.LogWarning("EZShopBagNoDiamondState");
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
			return "shop.bag.normal";
		}
		if(goDiamond_){
			return "shop.diamond";
		}
		return "";
	}
	public function over(){
		
	}
}