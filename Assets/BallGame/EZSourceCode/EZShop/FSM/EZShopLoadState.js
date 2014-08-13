#pragma strict

class EZShopLoadState extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var loading_:EZShopLoadingCtrl = null;
	private var bar_:EZShopBarCtrl;
	//private var ap_:EZApCtrl;
	public function EZShopLoadState(loading:EZShopLoadingCtrl, bar:EZShopBarCtrl){
		bar_ = bar;
		loading_ = loading;
		//ap_ = ap;
	}
	public function start(){
		isOver_ = false;
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		var bag:EZBagTable = EZBagTable.GetInstance();
		var shop:EZShopTable = EZShopTable.GetInstance();
		var tl:TaskList = new TaskList();
		
		var mt:MultiTask = new MultiTask();
#if UNITY_EDITOR
		if(!setup.isLoaded){
			mt.push(setup.load());
		}
#endif
		if(!player.isLoaded){
			mt.push(player.reload());
		}
	//	if(!bag.isLoaded){
		//	mt.push(bag.quickLoadTask());
	//	}
		
		
		//var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		//loading.time = 0;
		//loading.alpha = 1;
		//loading.text = EZDictionary.LookUp("!loading");
		
	//	mt.push(loading);
		
		mt.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Shop));
		tl.push(mt);
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		
		TaskManager.PushFront(loaded, function(){
			loading_.reload();
			bar_.open();
		});
		
		tl.push(loaded);
		
		TaskManager.PushBack(tl, function(){
			this.isOver_ = true;
		});
		
		TaskManager.Run(tl);
	}
	public function update(d:float){
		if(isOver_){
			return "shop.bar.normal";
		}
		return "";
	}
	public function over(){
		
		
	}
}