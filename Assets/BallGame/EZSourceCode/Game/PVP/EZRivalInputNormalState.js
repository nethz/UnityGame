#pragma strict

class EZRivalInputNormalState extends State{
	public function EZRivalInputNormalState(){ 
	}
	public function start(){
		
	}
	public function postEvent(evt:FSMEvent){
	
		var ret:String = "";
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		
		switch(evt.msg){
			//case "short.Bag1":
			//	action.msg = "action.bag1";
			//	ActionManager.Run(action);
//				break;
			//case "short.Bag2":
			//	action.msg = "action.bag2";
			//	ActionManager.Run(action);
			//	break;
			//case "short.Battle":
			//
			//	ret = "open.select";
			//	break;
				
				
			case "long.Bag1":
				action.msg = "foe.bag1.info";
				ActionManager.Run(action);
				break;
			case "long.Bag2":
				action.msg = "foe.bag2.info";
				ActionManager.Run(action);
				break;
			case "long.Battle":
				action.msg = "foe.battle.info";
				ActionManager.Run(action);
				break;
				
			
		
		}
		
		return ret;
		
	}


}