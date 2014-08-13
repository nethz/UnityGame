#pragma strict
class TaskManager extends MonoBehaviour{
	public var _factories:TaskFactories = null;
	public var _runner:TaskRunner = null;
	
	private var partRunner_:TaskRunner = null;
	private static var instance_:TaskManager = null; 
	private static var reserve_:Hashtable = new Hashtable();
	
	public function set partRunner(value:TaskRunner){
		this.partRunner_ = value as TaskRunner;
	}
	
	public function Awake(){
		for(var field:DictionaryEntry in reserve_){
			this._factories.registerTask(field.Key as String, field.Value as Function);
		}
		this.instance_ = this;
	}
	
	static function instance():TaskManager{
		return this.instance_;
	}
	
	function get globalRunner():TaskRunner{
		return _runner;
	}
	
	function get runner():TaskRunner{
		if(partRunner_ != null){
			return partRunner_;
		}
		return _runner;
	}
	
	function get factories():TaskFactories{
		return _factories;
	}
	
	static function registerTask(key:String, factory:Function){
		if(TaskManager.instance()){
			TaskManager.instance().factories.registerTask(key, factory);
		}else{
			reserve_[key] = factory;
		}
	
	}
	
	static function Create(name:String):Task{
		if(TaskManager.instance()){
			return TaskManager.instance().factories.createTask(name) as Task;
		}
		return null;
	}

	static function unregisterTask(key:String){
		if(TaskManager.instance()){
			TaskManager.instance().factories.unregisterTask(key);
		}
	}
	
	static function run(taskName:String){
		var task:Task = TaskManager.instance().factories.createTask(taskName) as Task;	
		TaskManager.Run(task);
	}
	
	static function AddOver(task:Task, func:Function){
		var oIsOver = task.isOver;
		task.isOver = function(){
			return (oIsOver() || func());
		};
	}
	
	static function PushBack(task:Task, func:Function){
		var oShutdown = task.shutdown;
		task.shutdown = function(){
			oShutdown();
			func();
		};
	}
	
	static function Run(task:Task){
		if(TaskManager.instance()){
			TaskManager.instance().runner.addTask(task);
		}
	};
	
	static function HasTask(key:String):boolean{
		if(TaskManager.instance()){
			return TaskManager.instance().factories.hasTask(key);
		}
		return false;
	}
	
	static function PushFront(task:Task, func:Function){
		var oInit = task.init;
		task.init = function(){
			func();
			oInit();
		};
	}
};