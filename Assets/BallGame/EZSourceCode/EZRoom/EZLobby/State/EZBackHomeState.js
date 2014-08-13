#pragma strict

class EZBackHomeState  extends StateWithEventMap{

	private var ctrl_:EZUICtrl = null;
	private var isOver_:boolean = false;
	public function EZBackHomeState(ctrl:EZUICtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
	
		isOver_ = false;
		var task:Task = ctrl_.backToHome();
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		
		});
		TaskManager.Run(task);
		//lobby_.guide.canShowPop = false;
	}
	public function update(d:float):String{
		if(isOver_){
			return "sleep";
		}
		return "";
		
	}
}