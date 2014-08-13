#pragma strict
/*
class LevelInfo  extends MonoBehaviour{
	private var loaded_:boolean = false; 
	public var _map:RPGMap;
	public function Awake(){
		Debug.LogError(this.name);
		ActionManager.registerAction("rpg.level.loading", this.loading);
		TaskManager.registerTask("rpg.level.wait.loaded", this.waitLoadedTask);
	}
	

	private function loading(){ 
		var action:LoadLevelInfoAction = new LoadLevelInfoAction(); 
		
		action.execute = function(){
			_map.load(action.levelInfo);
			loaded_ = true;
		};
		return action;
	}
	public function OnDestroy(){
		ActionManager.unregisterFunction("rpg.level.loading");
		TaskManager.unregisterTask("rpg.level.wait.loaded");
	}
	private function waitLoadedTask(){
		var task:Task = new Task();
		task.isOver = function(){return loaded_;}; 
		task.shutdown = function(){
			this.loaded_ = false;
		};
		return task;
	}
}
*/