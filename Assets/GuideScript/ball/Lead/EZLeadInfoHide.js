#pragma strict

class EZLeadInfoHide extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	private var isOver_:boolean = false;
	public function EZLeadInfoHide(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
	
		isOver_ = false;
	
		var task:Task = ctrl_.hide();
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
		TaskManager.Run(task);
		
		
			
	}
	public function update(d:float):String{
		if(isOver_){
			return "close";
		}
		return "";
	}

}

