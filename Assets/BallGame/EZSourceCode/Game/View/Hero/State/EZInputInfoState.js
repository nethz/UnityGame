#pragma strict

class EZInputInfoState extends State{

	public function postEvent(evt:FSMEvent){
	
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		if(action){
			switch(evt.msg){
			case "short.Bag1":
			case "long.Bag1":
				action.msg = "we.bag1.info";
				ActionManager.Run(action);
			break;
			
			case "short.Bag2":
			case "long.Bag2":
				action.msg = "we.bag2.info";
				ActionManager.Run(action);
			break;
			
			case "short.Battle":
			case "long.Battle":
				action.msg = "we.battle.info";
				ActionManager.Run(action);
			break;
			}
			
		}
		return "";
	}
	

}