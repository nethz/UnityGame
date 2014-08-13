#pragma strict
class EZFightInfoState extends State{

	private var context_:EZModelContext;
	private var seat_:EZSoul.Seat = EZSoul.Seat.None;
	public function  EZFightInfoState(context:EZModelContext){
		context_ = context;
	}
	
	public function start(){
		ActionManager.Run("view.input.info");
		ActionManager.Run("puzzle.ignore");
		Debug.Log("EZFightInfoState");
		
		seat_ = msg2Seat(context_.action);
		EZFightInfo.GetInstance().setSeat(seat_);
		
		var action:EZIDBoolAction = ActionManager.Create("view.hud.arrow") as EZIDBoolAction;
		action.val = true;
		action.id = seat_;
		ActionManager.Run(action);
		EZUIInfo.GetInstance().open();
	}
	
	
	public function over(){
		
		var action:EZIDBoolAction = ActionManager.Create("view.hud.arrow") as EZIDBoolAction;
		action.val = false;
		action.id = seat_;
		ActionManager.Run(action);
		
		
		EZUIInfo.GetInstance().close();
		ActionManager.Run("view.input.disable");
	}
	
	public function msg2Seat(msg:String):EZSoul.Seat{
		var seat:EZSoul.Seat = EZSoul.Seat.None;
		switch(msg){
		case "we.battle.info":
			seat = EZSoul.Seat.WeBattle;
			break;
		case "we.bag1.info":
			seat = EZSoul.Seat.WeBag1;
			break;
		case "we.bag2.info":
			seat = EZSoul.Seat.WeBag2;
			break;
		case "foe.battle.info":
			seat = EZSoul.Seat.FoeBattle;
			break;
		case "foe.bag1.info":
			seat = EZSoul.Seat.FoeBag1;
			break;
		case "foe.bag2.info":
			seat = EZSoul.Seat.FoeBag2;
			break;
			
		
		}
		
		return seat;
	}
	public function postEvent(evt:FSMEvent){
		if(evt.msg == "back"){
			return "fight.input";
		
		}else{
			var seat:EZSoul.Seat = msg2Seat(evt.msg);
			if(seat != EZSoul.Seat.None){
				var action:EZIDBoolAction = ActionManager.Create("view.hud.arrow") as EZIDBoolAction;
				action.val = false;
				action.id = seat_;
				ActionManager.Run(action);
				
				seat_ = seat;
				action.val = true;
				action.id = seat_;
				ActionManager.Run(action);
			}
			
			
			
			
			EZFightInfo.GetInstance().setSeat(seat);
		}
		return "";
	}

//	public function update(d:float){
	//	if(isOver_){
		//	return "fight.input";
//		}
	//	return "";
		
	
	//}
}
