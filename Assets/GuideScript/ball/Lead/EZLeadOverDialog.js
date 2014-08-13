#pragma strict


class EZLeadOverDialog extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	private var isOver_:boolean = false;
	public function EZLeadOverDialog(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		if(String.IsNullOrEmpty(ctrl_._overText)){
			isOver_ = true;
		}else{
			var task:Task = ctrl_._downDialog.showTextTask(ctrl_._overText);
			TaskManager.PushBack(task, function(){
				isOver_ = true;
			});
			TaskManager.Run(task);
		}
		
			
	}
	public function update(d:float):String{
		if(isOver_){
			return "hide";
		}
		return "";
	}

}