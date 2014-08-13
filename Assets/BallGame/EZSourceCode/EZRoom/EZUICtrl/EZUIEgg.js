#pragma strict

class EZUIEgg extends EZUIBase{
	public var _egg:EZEggCtrl = null;
	public var _logic:EZSettingLogic = null;
	public var _panels:EZUIPanels = null;
	public function updateTag(name:String){
		if(name == this.name){
			_egg.tag = "Ctrl";
		}else{
			_egg.tag = "Untagged";
		}
	}
	
	public function show():Task{
		var task:Task = _panels.show();
		TaskManager.PushFront(task, function(){
			this.gameObject.SetActive(true);
			_egg.tag = "Ctrl";
		});
		TaskManager.PushBack(task, function(){
			Debug.Log("on setting force");
			//!!_logic.onForce();
		});
		return task;
	
	}
	public function hide():Task{
	
		var task:Task = _panels.hide();
		
		TaskManager.PushFront(task, function(){
			//!!_logic.outForce();
		});
		TaskManager.PushBack(task, function(){
		
			_egg.tag = "Untagged";
			this.gameObject.SetActive(false);
		});
		return task;
	}
}