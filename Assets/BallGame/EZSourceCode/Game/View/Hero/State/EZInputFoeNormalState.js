#pragma strict

class EZInputFoeNormalState extends State{
	public function EZInputFoeNormalState(){ 
	}
	public function postEvent(evt:FSMEvent){
	
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		if(action){
			switch(evt.msg){
			case "short.Bag1":
				action.msg = "foe.bag1";
				ActionManager.Run(action);
			break;
			
			case "short.Bag2":
				action.msg = "foe.bag2";
				ActionManager.Run(action);
			break;
			
			case "short.Battle":
				action.msg = "foe.battle";
				ActionManager.Run(action);
			break;
			
			
			
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
			
		}
		return "";
	}


}