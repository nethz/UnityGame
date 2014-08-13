#pragma strict

class EZGuideLoadState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function EZGuideLoadState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 1;
		tl.push(loaded);
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	
	public function update(d:float){
		if(isOver_){
			return "select";
		}
		return "";
	}
	

	
}