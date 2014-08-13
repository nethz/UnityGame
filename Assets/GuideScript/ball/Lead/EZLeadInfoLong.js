
#pragma strict


class EZLeadInfoLong extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadInfoLong(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
		
	}
	public function start(){
		isOver_ = false;
		ctrl_._touchBack.enabled = true;
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
	public function over(){
		if(!String.IsNullOrEmpty(ctrl_._infoPop2)){
			EZPopCtrl.GetInstance().openLead(EZSoul.Seat.FoeBattle, ctrl_._infoPop2, -1);
		}
		ctrl_._touchBack.enabled = false;
	}
}
