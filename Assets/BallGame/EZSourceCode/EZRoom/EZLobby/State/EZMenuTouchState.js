#pragma strict

class EZMenuTouchState extends StateWithEventMap{
	private var ctrl_:EZLobbyCtrl = null;
	private var isTouch_:boolean = false;
	private var isOver_:boolean = false;
	function EZMenuTouchState(ctrl:EZLobbyCtrl){
		ctrl_ = ctrl;
		
		addEvent("weixin", "play.weixin");
	}
	
	function start(){
		isOver_ = false;
		ctrl_.logo.showTouch();
		isTouch_ = true;
		
	}
	function over(){
		Debug.Log("D");
	}
	function postEvent(evt:FSMEvent):String{
		if(isTouch_ && evt.msg == "touch"){
			isTouch_ = false;
			var tl:TaskList = new TaskList();
			tl.push(ctrl_.loadHeroTask(0));
			var mt:MultiTask = new MultiTask();
			var cameraSize:Task = TaskManager.Create("lobby.camera.size");
			mt.push(cameraSize);
			mt.push(ctrl_.view.openUITask(0.3f));
			mt.push(ctrl_.logo.fadeOut());
			TaskManager.PushBack(mt, function(){
				isOver_ = true;
				ctrl_.guide.open();
			});
			
	
			tl.push(mt);
			tl.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Home));
			TaskManager.Run(tl);
		}
		return super.postEvent(evt);
	}
	function update(d:float):String{
		if(isOver_){
			return "play";
		
		}
		return "";
	}

}