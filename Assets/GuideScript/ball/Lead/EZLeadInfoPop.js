#pragma strict


class EZLeadInfoPop extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	private var isOver_:boolean = false;
	public function EZLeadInfoPop(ctrl:EZLeadCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.LogWarning("EZLeadInfoPop");
		isOver_ = false;
		if(String.IsNullOrEmpty(ctrl_._infoPop)){
			isOver_ = true;
		}else{
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(0.5f);
			TaskManager.PushFront(wait, function(){
				EZPopCtrl.GetInstance().openLead(EZSoul.Seat.FoeBattle, ctrl_._infoPop, ctrl_.gameObject.layer);
			});
			TaskManager.PushBack(wait, function(){
				isOver_ = true;
			});
		
			TaskManager.Run(wait);
		
		}
		
		
		
		
			
	}
	public function update(d:float):String{
		if(isOver_){
			return "wait";
		}
	}
	
	public function over(){
		
	}
}