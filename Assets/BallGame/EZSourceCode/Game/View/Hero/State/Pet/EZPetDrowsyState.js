#pragma strict
	
class EZPetDrowsyState extends State{

	private var task_:Task = null;
	private var isOver_ = false;
	public function EZPetDrowsyState(task:Task){
		
		task_ = task;
		TaskManager.PushBack(task_, function(){this.isOver_ = true;});
	}
	public function start(){
		isOver_ = false;
		TaskManager.Run(task_);
		
	}
	public function update(d:float){
		if(isOver_){
			return "sleep";
		}
		return "";
	}
	public function over(){
	}


}