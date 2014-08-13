#pragma strict


class EZPlayState extends State{
	private var window_:EZWindowTask = null;
//	private var warning_:EZWarningTask = null;
	function postEvent(evt:FSMEvent):String{
		
		if(window_ == null && evt.msg == "goOut"){
			window_ = TaskManager.Create("global.ui.window") as EZWindowTask;
			window_.text = EZDictionary.LookUp("!out_play");
			window_.ok = EZDictionary.LookUp("!ok");
			window_.cancel = EZDictionary.LookUp("!cancel");
			TaskManager.PushBack(window_, function(){
				if(window_.okOrCancel){
					var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
					loading.time = 0.3;
					loading.alpha = 1;
					loading.text = EZDictionary.LookUp("!loading");
					TaskManager.PushBack(loading, function(){
						EZGlobal.GetInstance().LoadLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home));
					});
					TaskManager.Run(loading);
				}else{
					window_ = null;
				}
			});
			TaskManager.Run(window_);
		}
		return "";
	
	}
}