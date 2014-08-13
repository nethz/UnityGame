#pragma strict


class EZFinishShowOverState extends State{
	var loading_:EZLoadingTask = null;
	function start(){
		var task:Task = GameWinView.GetInstance().reward.showTask();
		TaskManager.Run(task);
	}
	
	function postEvent(evt:FSMEvent):String{
		Debug.Log(evt.msg);
		if(loading_ == null && evt.msg == "finish"){
		
			loading_ = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading_.time = 0.3;
			loading_.alpha = 1;
			loading_.text = EZDictionary.LookUp("!loading");
			
			TaskManager.PushBack(loading_, function(){
				EZGlobal.GetInstance().LoadLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home));
			});
			TaskManager.Run(loading_);
			
		}
		return "";
	}
	
}