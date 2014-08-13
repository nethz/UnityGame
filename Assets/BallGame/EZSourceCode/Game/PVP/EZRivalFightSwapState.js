#pragma strict
class EZRivalFightSwapState extends StateWithEventMap{
	private var isOver_:boolean;
	private var context_:EZModelContext;
	
	public function  EZRivalFightSwapState(context:EZModelContext){
		context_ = context;
	}
	
	
	public function start(){
		//ActionManager.Run("puzzle.ignore");
		//Debug.Log("EZFightSwapState");
		isOver_ = false;
		
		var fsc:EZContainer = EZContainerManager.GetContainer(EZSoul.Seat.FoeBattle) as EZContainer; 
	 	var tsc:EZContainer = null;
		var swap:EZIDTask = TaskManager.Create("view.swap") as EZIDTask;
		
		if(context_.action == "swap.bag1"){
			swap.id = EZView.Seat.FoeBag1;
			tsc = EZContainerManager.GetContainer(EZSoul.Seat.FoeBag1) as EZContainer;
		}else{
			swap.id = EZView.Seat.FoeBag2;
			tsc = EZContainerManager.GetContainer(EZSoul.Seat.FoeBag1) as EZContainer;
		}
		if(tsc){
		
			TaskManager.PushFront(swap, function(){
				var from:EZSoul = tsc.soul; 
				from.resetMagicPower();
				EZCtrl.ViewCrystal(true);
				
			});
			TaskManager.PushBack(swap, function(){
				EZCtrl.ViewSkillBar(EZSoul.Seat.FoeBattle, false);
				EZCtrl.ViewMagicBar(swap.id, 0);
				isOver_ = true;
				
			});
			tsc.swap(fsc);
			TaskManager.Run(swap);
		}else{
			isOver_ = true;
		}
		
		
	}
	public function update(d:float){
		if(isOver_){
			return "fight.run.start";
		}
		return "";
	}

}
