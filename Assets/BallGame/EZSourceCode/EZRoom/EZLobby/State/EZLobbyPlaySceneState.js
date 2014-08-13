#pragma strict

class EZLobbyPlaySceneState extends State{
	private var stateName_:String = "";
	private var task_:Task = null;
	private var isOver_:boolean = false;
	public function EZLobbyPlaySceneState(stateName:String, task:Task){
		stateName_ = stateName;
		//task_ = task;
		//TaskManager.PushBack(task_, function(){
		//	isOver_ = true;
		//	Debug.Log(isOver_);
		//});
	}
	
	public function start(){
		//Debug.Log("play shop");
		//isOver_ = false;
		
		//TaskManager.Run(task_);
	}
	public function update(d:float):String{
		
	//	if(isOver_){
			Debug.Log(stateName_);
			return stateName_;
	//	}
	//	return "";
	
	}
}