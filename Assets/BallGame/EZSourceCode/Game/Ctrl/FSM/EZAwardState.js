#pragma strict


class EZAwardState extends State{
	private var isOver_:boolean;
	public function start(){
		isOver_ = false;
		var task:Task = TaskManager.Create("view.foe.collect");
		
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
		TaskManager.Run(task);
		
		
		
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "rest";
		}else{
			return "";
		}
	}
}
