#pragma strict



class EZLeadInfoShort extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	private var isOver_:boolean = false;
	public function EZLeadInfoShort(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		ctrl_._no.play();
		if(String.IsNullOrEmpty(ctrl_._infoShort)){
			isOver_ = true;
		}else{
			var task:Task = ctrl_._downDialog.showTextTask(ctrl_._infoShort);
			TaskManager.PushBack(task, function(){
				isOver_ = true;
			});
			TaskManager.Run(task);
		}
		
			
	}
	public function update(d:float):String{
		if(isOver_){
			return "wait";
		}
		return "";
	}
	public function over(){
		
	}
}

