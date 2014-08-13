#pragma strict

class EZPetInfoWebState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	public var isOver_:boolean = false;
	public function EZPetInfoWebState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
		
	}
	public function start(){
		ctrl_.inputClose();
		
		var card:EZCard = ctrl_.info.card;
		var task:Task = ctrl_.info.setPetInfoTask(card);
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
		TaskManager.Run(task);

	}
	public function over(){
	
		ctrl_.inputOpen();
		ctrl_.info.needUpdate = false;
	
	}
	public function update(d:float):String{
		if(isOver_){
			return "info.input";
		}
		return "";
		
	}
	
}