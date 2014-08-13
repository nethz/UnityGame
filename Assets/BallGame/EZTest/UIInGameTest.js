#pragma strict

class UIInGameTest extends MonoBehaviour{
	
	public function Start(){
		var tl:TaskList = new TaskList();
		
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(3);
		tl.push(wait);
		var loaded:Task = TaskManager.Create("view.ui.loaded");
		
		
		var wait2:EZWaitTask = new EZWaitTask();
		wait2.setAllTime(1);
		TaskManager.PushBack(wait2, function(){
			//ActionManager.Run("view.ui.loading");
			
		});
		tl.push(loaded);
		tl.push(wait2);
		TaskManager.Run(tl);
	}

	
}