#pragma strict

class SettingItemManager extends MonoBehaviour{
	public var	itemFly:SettingItemFly = null;
	
	public function Start(){
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask =  new EZWaitTask();
		wait.setAllTime(3);
		tl.push(wait);
		var flyIn:Task = itemFly.openTask();
		tl.push(flyIn);
		var wait2:EZWaitTask =  new EZWaitTask();
		wait2.setAllTime(3);
		tl.push(wait2);
		var flyOut:Task = itemFly.closeTask();
		tl.push(flyOut);
		TaskManager.Run(tl);
	}
}