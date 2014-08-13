#pragma strict



class TaskRunner extends MonoBehaviour{
	
	private var filter_:Filter = null;
	private var tasks_:ArrayList = null;
	static function Create(obj:GameObject):TaskRunner{
		var runner:TaskRunner = obj.GetComponent(TaskRunner) as TaskRunner;
		if(runner == null){
			runner = obj.AddComponent(TaskRunner) as TaskRunner;
		}
		return runner;
	}
	function Awake()
	{	
		this.filter_ = new Filter();
		this.tasks_ = new ArrayList();
	}
	function update(d:float){
		var tasks = new ArrayList();
//		Debug.Log("update");
		for(var i=0; i< this.tasks_.Count; ++i){
			var task = this.tasks_[i] as Task;
			task.update(d);
			if(!task.isOver()){
				tasks.Add(task);
			}else{
				task.shutdown();
			}
		}
		this.tasks_ = tasks;
	}
	
	function OnDestroy(){
		for(var i=0; i< this.tasks_.Count; ++i){
			var task = this.tasks_[i] as Task;
			task.shutdown();
		}
		tasks_ = new ArrayList();
	}
	function addTask(task:Task){
		
		task.init();
		this.tasks_.Add(task);
	}
	
	function Update() { 
		var d:float = filter_.interval(Time.deltaTime);
		this.update(d);
	}
};