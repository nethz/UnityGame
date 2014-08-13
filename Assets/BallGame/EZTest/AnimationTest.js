#pragma strict

class AnimationTest extends MonoBehaviour{
	public var _skeletal:EZSkeletal = null;
	
	public function Start(){
		Debug.Log("A");
		var load:Task = _skeletal.loadTask(this.gameObject.layer);
		
		TaskManager.PushBack(load, function(){
			var task = _skeletal.createAnimationTask("magic");
			TaskManager.Run(task);
			
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(1);
			wait.shutdown = function(){
				task.close();
			};
			TaskManager.Run(wait);
			
			
			var wait2:EZWaitTask = new EZWaitTask();
			wait2.setAllTime(7);
			wait2.shutdown = function(){
				
				TaskManager.Run(task);
			};
			TaskManager.Run(wait2);
		});
		TaskManager.Run(load);
		
	}
	
	
}