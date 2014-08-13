#pragma strict

class EZRivalInputInfoState extends State{

	public function postEvent(evt:FSMEvent){
	
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		if(action){
			switch(evt.msg){
			case "short.Bag1":
			case "long.Bag1":
				action.msg = "foe.bag1.info";
				ActionManager.Run(action);
			break;
			
			case "short.Bag2":
			case "long.Bag2":
				action.msg = "foe.bag2.info";
				ActionManager.Run(action);
			break;
			
			case "short.Battle":
			case "long.Battle":
				action.msg = "foe.battle.info";
				ActionManager.Run(action);
			break;
			}
			
		}
		return "";
	}
	

}