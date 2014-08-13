#pragma strict

class QuestLoadState extends StateWithEventMap{
	private var ctrl_:QuestCtrl = null;
	private var isOver_:boolean = false;
	
	public function QuestLoadState(ctrl:QuestCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var questBag:EZQuestBagTable = EZQuestBagTable.GetInstance();
		var missionBag:EZMissionBagTable = EZMissionBagTable.GetInstance();
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
	
		if(!questBag.isLoaded){
			var qTask:Task = questBag.loadTask();
			tl.push(qTask);
		}
	
		
		
		if(!player.isLoaded)
		{
			var pTask:Task = player.reload();
			tl.push(pTask);
		}
		
		
		tl.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Quest));
		//tl.push(mt);
	
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		tl.push(loaded);
		TaskManager.PushFront(loaded, function(){
			ctrl_.setup(questBag.bag, questBag.list);
		//	EZBroadcast.GetInstance().open(JsonData.Broadcast.Scene.Quest);
			ctrl_.loadMain();
					
		});
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		
		});
		TaskManager.Run(tl);
	}
	
	public function update(d:float){
		if(isOver_){
			return "main";
		}
		return "";
	}
	

	
}