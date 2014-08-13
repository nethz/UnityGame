#pragma strict

class MissionLoadState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var isOver_:boolean = false;
	
	public function MissionLoadState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var missionBag:EZMissionBagTable = EZMissionBagTable.GetInstance();
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		var bag:EZBagTable = EZBagTable.GetInstance();
		var mt:MultiTask = new MultiTask();
	
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		mt.push(loading);
	
		if(!player.isLoaded){
			var pTask:Task = player.reload();
			mt.push(pTask);
		}
		
		
		mt.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Mission));
		tl.push(mt);
		
		
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		tl.push(loaded); 
		TaskManager.PushFront(loaded, function(){  
			ctrl_.setup(missionBag.bag, missionBag.list, missionBag.evtList);
			ctrl_.loadMission();
		});
		
		TaskManager.PushBack(tl, function(){
			this.isOver_ = true;
		});
		
		TaskManager.Run(tl);
		
	}
	
	public function update(d:float){
		if(isOver_){
			//if(EZGlobal.GetInstance().missionType == EZMissionBagTable.Type.Evt)
			//	return "event.in";
			return "pve.in";
		}
		return "";
	}
	
	public function over(){
//		EZGlobal.GetInstance().missionType = EZMissionBagTable.Type.Pve;
	}
}