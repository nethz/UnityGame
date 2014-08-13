#pragma strict

class EZEggLoadState extends StateWithEventMap{
	private var isOver_:boolean = false;
	public var ctrl_:EZEggCtrl = null;
	
	public function EZEggLoadState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		var bag:EZBagTable = EZBagTable.GetInstance();
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		var mt:MultiTask = new MultiTask();
		mt.push(loading);  

		if(!player.isLoaded){
			mt.push(player.reload());
		}
#if UNITY_EDITOR
		if(!setup.isLoaded){
			mt.push(setup.load());
		}
#endif
		//if(!bag.isLoaded){
		//	mt.push(bag.quickLoadTask());
		//}
		
		
		var broadcast:Task = EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Egg);
		mt.push(broadcast);
		
		tl.push(mt);
	
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		tl.push(loaded);
		TaskManager.PushFront(loaded, function(){
			ctrl_.load();//load main infomation!!!!
			ctrl_.main.open();
					
		});
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	public function update(d:float):String{
		if(isOver_){
			return "egg.main.input";
		}	
		return "";
	}
}