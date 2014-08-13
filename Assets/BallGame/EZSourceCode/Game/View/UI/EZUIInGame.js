#pragma strict

class EZUIInGame extends MonoBehaviour{
	public var _loading:UIPanel = null;
	public function Awake(){
		//TaskManager.registerTask("view.ui.loaded", uiLoadedTask);
		//ActionManager.registerFunction("view.ui.loading", function(){
		//	_loading.alpha = 1;
		//});
	}
	
	private function uiLoadedTask():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			ta = TweenAlpha.Begin(_loading.gameObject, 0.3f, 0f);
			
		};
		task.isOver = function():boolean{
			return !ta.enabled;
		};
		
	
		return task;
	}
	public function OnDestroy(){
	//	ActionManager.unregisterFunction("view.ui.loading");
		//TaskManager.unregisterTask("view.ui.loaded");
	}
	
}