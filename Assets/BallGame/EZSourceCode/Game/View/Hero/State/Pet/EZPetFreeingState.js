#pragma strict

class EZPetFreeingState extends State{

	private var task_:Task = null;
	private var isOver_ = false;
	public function EZPetFreeingState(task:Task){
		task_ = task;
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
	}
	public function start(){
		isOver_ = false;
		TaskManager.Run(task_);
	}
	function postEvent(evt:FSMEvent)
	{	
		Debug.LogWarning(evt.msg + "!@!!!!!");
		return "";
	}
	public function update(d:float){
		if(isOver_){
			return "ghost";
		}
		return "";
	}
	public function over(){
		
	}
	


}