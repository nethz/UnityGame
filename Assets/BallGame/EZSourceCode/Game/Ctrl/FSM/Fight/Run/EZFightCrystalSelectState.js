#pragma strict
class EZFightCrystalSelectState extends State{
	private var isOver_:boolean;
	private var context_:EZModelContext = null;
	
	public function start(){
		isOver_ = false;
		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1) as EZSoul;
		var bag2:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag2) as EZSoul;
		if(!bag1.alive){
			context_.action = "action.bag2";
			isOver_ = true;
		}else if(!bag2.alive){
			context_.action = "action.bag1";
			isOver_ = true;
		
		}else{
			ActionManager.Run("view.input.enable");
			var action:EZIDBoolAction = ActionManager.Create("view.pet.selected") as EZIDBoolAction;
			action.id = EZView.Seat.WeBag1;
			action.val = true;
			ActionManager.Run(action);
			action.id = EZView.Seat.WeBag2;
			action.val = true;
			ActionManager.Run(action);
		
		}
	
	}

	public function EZFightCrystalSelectState(context:EZModelContext){
		context_ = context;  
	} 
	
	public function postEvent(evt:FSMEvent){
		Debug.Log(evt.msg);
		switch(evt.msg){
		case "action.bag1":  
		case "action.bag2":
			context_.action = evt.msg;
			isOver_ = true;
			break;
		
		
		}
		return "";
	}
	
	public function update(d:float):String{
		if(isOver_){
			return "fight.crystal.switch";
		}
		return "";
	}
	
	public function over(){
		var action:EZIDBoolAction = ActionManager.Create("view.pet.selected") as EZIDBoolAction;
		action.id = EZView.Seat.WeBag1;
		action.val = false;
		ActionManager.Run(action);
		action.id = EZView.Seat.WeBag2;
		action.val = false;
		ActionManager.Run(action);
		ActionManager.Run("view.input.disable");
	}
}
