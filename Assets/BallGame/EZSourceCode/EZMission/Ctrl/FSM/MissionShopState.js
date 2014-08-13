#pragma strict

class MissionShopState extends StateWithEventMap{
	var ctrl_:MissionCtrl = null;
	var isOver_:boolean  = false;
	
	public function MissionShopState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.Log("go to Level");
		isOver_ = false;
		var mt:MultiTask = new MultiTask();
		var tl:TaskList = new TaskList();
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		mt.push(loading);
		TaskManager.PushFront(mt, function(){
			var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		});
		tl.push(mt);
		TaskManager.PushBack(tl, function(){
			EZGlobal.GetInstance().LoadLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home));
			isOver_ = true;
		});
		TaskManager.Run(tl);
		
	}
	public function update(d:float):String{
		if(isOver_){
			Debug.Log("!!@#$%*(^%$#");
		}
		return "";
	}

}