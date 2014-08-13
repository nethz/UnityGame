#pragma strict

class EZPetSellWebState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	private var isOver_:boolean = false;
	public function EZPetSellWebState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	}
	



	public function start(){
	
		ctrl_.teamGuideOver();
		ctrl_.inputClose();
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var cards:EZCard[]  = ctrl_._model._sell.cards;
		var ids:Array = new Array();
		for(var i:int = 0; i< cards.length; ++i){
			if(cards[i] != null){
				ids.push(cards[i].id);
			}
		}
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 0.5;
		loading.text = EZDictionary.LookUp("!loading");
	
		
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0;
		
		
	
		
		
		var sell:Task = EZBagTable.GetInstance().quickSell(ids);
		TaskManager.PushFront(sell, function(){ctrl_.clear();});
		
		
		var ud:Task = ctrl_.updateBag(false);
		TaskManager.PushBack(ud, function(){
			ctrl_.refresh();
		});
		
		
		tl.push(loading);
		tl.push(sell);
		tl.push(ud);
		tl.push(loaded);
		tl.push(ctrl_.sellWarning(EZBagTable.GetInstance().bag.money));
		
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		
		
		TaskManager.Run(tl);
		
		Debug.Log("EZPetSellWebState start");
	}
	public function over(){
		
		Debug.Log("EZPetSellWebState over");
		ctrl_.inputOpen();
	}
	public function update(d:float){
		if(isOver_){
			return "sell.input";
		
		}
		return "";
	
	}
	
}