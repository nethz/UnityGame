#pragma strict

class TaskFactories extends MonoBehaviour{

	private var taskMap_:Hashtable = new Hashtable();
	
	function registerTask(key:String, factory:Function){
		this.taskMap_[key] = factory;
	}
	
	function unregisterTask(key:String){
		this.taskMap_.Remove(key);// = factory;
	}
	
	
	function hasTask(key:String):boolean{
		return this.taskMap_.ContainsKey(key);
	}
	function createTask(key:String){
		var func:Function = this.taskMap_[key] as Function;
		if(func != null)
			return func();
		Debug.LogError("can't find task '"+key+"'.");
		return new Task();
	   
	}
/*
	function clear(){
		this.taskMap_.Clear();
	}
	*/
	


};