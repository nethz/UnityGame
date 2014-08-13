#pragma strict

class EZWeixinErrorState extends State{
	private var ctrl_:EZWeixinCtrl = null;
	private var isOver_:boolean = false;
	public function EZWeixinErrorState(ctrl:EZWeixinCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.Log("EZWeixinErrorState");
		isOver_ = false;
		var task:Task = ctrl_.errorTask();
		TaskManager.PushBack(task, function(){
			isOver_ =  true;
		});
		TaskManager.Run(task);
	}
	public function update(d:float):String{
		if(isOver_){
			return "go.logo";
		}
		return "";
		
	}
	
}