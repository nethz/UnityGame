#pragma strict

class EZShopBagNoMoneyState extends StateWithEventMap{

	private var isOver_:boolean = false;
	public function EZShopBagNoMoneyState(){
	}
	
	public function start(){
		isOver_ = false;
		
		var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		task.addText(EZDictionary.LookUp("!no_money"));
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
		TaskManager.Run(task);
	
	}
	public function update(d:float):String{
		if(isOver_){
			return "shop.bag.normal";
		}
		return "";
	/*
		
	*/		
	}
	public function over(){
	}
}