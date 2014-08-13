#pragma strict


class EZLeadSwapDialog extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	private var isOver_:boolean = false;
	public function EZLeadSwapDialog(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		if(String.IsNullOrEmpty(ctrl_._swapText)){
			isOver_ = true;
		}else{
			var task:Task = ctrl_._downDialog.showTextTask(ctrl_._swapText);
			TaskManager.PushBack(task, function(){
				isOver_ = true;
			});
			TaskManager.Run(task);
		}
		
			
	}
	public function update(d:float):String{
		if(isOver_){
			return "battle";
		}
		return "";
	}
	public function over(){
		
	}
}