#pragma strict

class EZUISetting extends EZUIBase{
	public var _setting:EZSettingCtrl = null;
	public var _logic:EZSettingLogic = null;
	public var _panels:EZUIPanels = null;
	public function updateTag(name:String){
		if(name == this.name){
			_setting.tag = "Ctrl";
		}else{
			_setting.tag = "Untagged";
		}
	}
	
	public function show():Task{
		var task:Task = _panels.show();
		TaskManager.PushFront(task, function(){
			this.gameObject.SetActive(true);
			_setting.tag = "Ctrl";
		});
		TaskManager.PushBack(task, function(){
			Debug.Log("on setting force");
			_logic.onForce();
		});
		return task;
	
	}
	public function hide():Task{
	
		var task:Task = _panels.hide();
		
		TaskManager.PushFront(task, function(){
			_logic.outForce();
		});
		TaskManager.PushBack(task, function(){
		
			_setting.tag = "Untagged";
			this.gameObject.SetActive(false);
		});
		return task;
	}
}