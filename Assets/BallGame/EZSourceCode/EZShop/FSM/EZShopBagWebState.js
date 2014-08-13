#pragma strict

class EZShopBagWebState extends StateWithEventMap{
	
	private var isOver_:boolean = false;
	private var mode_:String = "";
	public var _loading:EZShopLoadingCtrl;
	public function EZShopBagWebState(mode:String, loading:EZShopLoadingCtrl){
		mode_ = mode;
		_loading = loading;
	}
	private function onMoneyTask():Task{
		var table:EZShopTable = EZShopTable.GetInstance();
		var web:WebLoaderTask = table.bagMax(mode_);
		 TaskManager.PushBack(web, function(){ 
			var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask; 
			var info:JsonData.BagMaxInfo = web.data as JsonData.BagMaxInfo;
			if(info && info.succeed){
				warning.addText(EZDictionary.LookUp("!max_bag_begin") + info.quickBag.bag.max.ToString() + EZDictionary.LookUp("!max_bag_end"));
				TaskManager.Run(warning);
			}
		});
	
		return web;
	}
	public function start(){
		isOver_ = false;
		
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		
		var bag:JsonData.Bag = EZBagTable.GetInstance().bag; 
		var limit:int = setup.player.getXpBagLimit(player.exp);
		if(bag.max +1 > limit){
			var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			task.addText(EZDictionary.LookUp("!bag_max_need_lv"));
			TaskManager.PushBack(task, function(){
				isOver_ = true;
			});
			TaskManager.Run(task);
		
		}else{
			var doload:EZDoLoadTask = TaskManager.Create("global.ui.doload") as EZDoLoadTask;
			doload.text = EZDictionary.LookUp("!bag_loading");
			doload.task = new onMoneyTask();
			TaskManager.PushBack(doload, function(){
				isOver_ = true;
				_loading.reload();
			});
			TaskManager.Run(doload);
		
		}
		
		
	
	}
	public function update(d:float):String{
		if(isOver_){
			return "shop.bag.normal";
		}
		return "";
	}
	public function over(){
	}
}