#pragma strict


class EZFightRunSwitchState extends StateWithEventMap{
	private var isOver_:boolean = false;
	
	private var context_:EZModelContext = null;
	
	public function EZFightRunSwitchState(context:EZModelContext){
		context_ = context;  
	} 
	
	
	function start(){
	
		isOver_ = false;
	 	var fsc:EZContainer = EZContainerManager.GetContainer(EZSoul.Seat.WeBattle) as EZContainer; 
	 	
	 	var tsc:EZContainer = null;
	 	
		var swap:EZIDTask = TaskManager.Create("view.swap") as EZIDTask;
		
		if(context_.action == "action.bag1" && EZContainerManager.Alive(EZSoul.Seat.WeBag1)){
			swap.id = EZView.Seat.WeBag1;
			tsc = EZContainerManager.GetContainer(EZSoul.Seat.WeBag1) as EZContainer;
		}else if(context_.action == "action.bag2" && EZContainerManager.Alive(EZSoul.Seat.WeBag2)){
		
			swap.id =  EZView.Seat.WeBag2;
			tsc = EZContainerManager.GetContainer(EZSoul.Seat.WeBag2) as EZContainer;
		}else if(EZContainerManager.Alive(EZSoul.Seat.WeBag1)){
			swap.id = EZView.Seat.WeBag1;
			tsc = EZContainerManager.GetContainer(EZSoul.Seat.WeBag1) as EZContainer;
		}else if(EZContainerManager.Alive(EZSoul.Seat.WeBag2)){
			swap.id =  EZView.Seat.WeBag2;
			tsc = EZContainerManager.GetContainer(EZSoul.Seat.WeBag2) as EZContainer;
		}
		
		if(tsc)
		{	
			TaskManager.PushFront(swap, function(){
				var from:EZSoul = tsc.soul; 
				from.resetMagicPower();
				EZCtrl.ViewCrystal(true);
			});
			TaskManager.PushBack(swap, function(){
				
				
				EZCtrl.ViewMagicBar(swap.id, 0);
				EZCtrl.ViewSkillBar(EZSoul.Seat.WeBattle, false);
				
				
				
				isOver_ = true;
			});
			fsc.swap(tsc);
			TaskManager.Run(swap);
		
		}else{
			isOver_ = true;
		}
		
		
	}
	function update(d:float){
		if(isOver_){
			return "fight.run.over";
		}
		return "";
	}
	
}
