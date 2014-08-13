#pragma strict
/*
class EZFightCrystalShiftState extends StateWithEventMap{
	private var isOver_:boolean;
	
	
	private var context_:EZModelContext;
	
	function EZFightCrystalShiftState(context:EZModelContext){
		this.context_ = context;
	} 

	public function start(){
		isOver_ = true;
		var action:EZShiftAction = ActionManager.Create("model.calc.shift") as EZShiftAction;
		action.id  = this.context_.shiftId ;
		ActionManager.Run(action);
		EZCtrl.ViewFoeBar(action.seat, 0);
		EZCtrl.UpdateState(action.seat);
		this.context_.shiftId = this.context_.shiftId + 1;
	}
	
	function update(d:float){
	
		if(this.isOver_){
			if(this.context_.shiftId < this.context_.count) {
				return "fight.run.shift";
			}else{
			
				if(EZContainerManager.FightOver()){
					return "fight.crystal.over";
				}else{
					return "fight.crystal.buff";
				}
				
			}
		}
		return "";
		
		
		
		
	}
}*/
