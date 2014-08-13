#pragma strict

class CameraTaskManager extends MonoBehaviour{
	public var _prefix:String = "";
	public var _camera:Camera = null;
	public var _target:Transform;
	private var taskFactories_:Hashtable;
	public function Awake(){
		var factories:CameraTaskFactory[] = System.Array.ConvertAll(
			 gameObject.GetComponentsInChildren(CameraTaskFactory), 
			function (component){component as CameraTaskFactory;}
			);
			
	
		taskFactories_ = new Hashtable();
		for(var i:int = 0; i< factories.Length; ++i){
			factories[i].setCamera(_camera);
			factories[i].setTarget(_target);
			taskFactories_[factories[i].getName()] = factories[i];
		}
		if(_prefix != ""){
			for(var kv:DictionaryEntry in taskFactories_){
				TaskManager.registerTask(_prefix +kv.Key, function():Task{return this.create(kv.Key);});
			}
		}
	}
	function OnDestroy(){
	
		if(_prefix != ""){
			for(var kv:DictionaryEntry in taskFactories_){
				TaskManager.unregisterTask(_prefix +kv.Key.ToString());
			}
		}
		
	}
	function create(taskName:String):Task{
		if(this.taskFactories_.ContainsKey(taskName)){
			var factory:CameraTaskFactory = this.taskFactories_[taskName] as CameraTaskFactory;
			var task:Task = factory.create();
			return task;
		}
		Debug.LogError("CameraTaskManager error!" + taskName);
		return null;
	}



}