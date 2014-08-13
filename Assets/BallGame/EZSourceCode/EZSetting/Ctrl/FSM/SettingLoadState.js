#pragma strict

class SettingLoadState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	private var isOver_:boolean = false;
	
	
	public function SettingLoadState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		Debug.LogWarning("SettingLoadState SettingLoadState SettingLoadState SettingLoadState");
		isOver_ = false;
		var tl:TaskList = new TaskList();
		//var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		//loading.time = 0;
		//loading.alpha = 1;
		//loading.text = EZDictionary.LookUp("!loading");
		
		//tl.push(loading);
		
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		
		if(!player.isLoaded){
			tl.push(player.reload());
		}
		
		tl.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Setting));
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		
		
		
		
		
		TaskManager.PushFront(loaded, function(){
			ctrl_.setup();
		});
		tl.push(loaded);
		 
		
		 
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		TaskManager.Run(tl);
	} 
	public function over(){
		Debug.LogWarning("!!!!!!!!!!!!!!!!!!!!!!!SettingLoadState SettingLoadState SettingLoadState SettingLoadState");
	}
	public function update(d:float){
		if(isOver_){
			return "setup.main";
		}
		return "";
	}
}