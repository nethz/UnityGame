#pragma strict


class EZGamePuzzle extends MonoBehaviour{
	public function Awake(){
		
		ActionManager.registerFunction("puzzle.ignore", this.loadTask);
		ActionManager.registerFunction("puzzle.loaded", this.loadTask);
	}
	public function loadTask():Task{
		var task:Task = new Task();
		
		return task;
	}
	public function OnDestroy(){
	
	
		ActionManager.unregisterFunction("puzzle.ignore");
		ActionManager.unregisterFunction("puzzle.loaded");
	}
}