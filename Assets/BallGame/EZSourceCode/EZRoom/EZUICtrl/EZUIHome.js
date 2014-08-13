#pragma strict

class EZUIHome extends EZUIBase{
	public var _lobby:EZLobbyCtrl = null;
	public var _logic:EZLobbyLogic = null;
	public function open(){
		Debug.Log("open");
		this.gameObject.SetActive(true);
	}
	
	public function doDisabled():Task{
		//close all in put
		
		//var task:Task = new Task();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.15;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		
		TaskManager.PushFront(loading, function(){
			_lobby.tag = "Untagged";
		});
		
		
		return loading;
	}
	public function doEnabled():Task{
		var task:Task = new Task();
		TaskManager.PushFront(task, function(){
			_lobby.tag = "Ctrl";
		});
		return task;
	}
	public function doClose():Task{
		var task:Task = new Task();
		TaskManager.PushFront(task, function(){
			_logic.outForce();
		
		});
		
		TaskManager.PushBack(task, function(){
			this.gameObject.SetActive(false);
		
		});
		
		
		return task;
	}
	public function doOpen():Task{
		Debug.Log("doOpen ~~~");
		//var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		//loading.time = 0.3;
		//loading.alpha = 0.5;
		//loading.text = EZDictionary.LookUp("!loading");
		
		
		var task:Task = new Task();
		TaskManager.PushFront(task, function(){
			this.gameObject.SetActive(true);
			
		
		});
		TaskManager.PushBack(task, function(){
			Debug.Log("on home force");
			_logic.onForce();
		});
		
		
		
	
			
		return task;
	}
}