#pragma strict


class EZLeadInfoDialog extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	private var isOver_:boolean = false;
	public function EZLeadInfoDialog(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		
		if(String.IsNullOrEmpty(ctrl_._infoText)){
			isOver_ = true;
		}else{
			var task:Task = ctrl_._downDialog.showTextTask(ctrl_._infoText);
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