#pragma strict

class SettingWebState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	private var isOver_:boolean = false;
	public function SettingWebState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 0.5;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
		
		var table:EZPlayerTable = EZPlayerTable.GetInstance(); 
		Debug.Log(ctrl_.changeName);
		var task:Task = table.changeName(ctrl_.changeName);
		
		
		tl.push(task);
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;
		tl.push(loaded);
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	public function update(d:float){
		if(isOver_){
			return "setup.main";
		}
		return "";
	}
	public function over(){
	
	}
	
}