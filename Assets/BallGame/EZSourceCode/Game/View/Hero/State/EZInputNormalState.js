#pragma strict

class EZInputNormalState extends State{
	public function EZInputNormalState(){ 
	}
	public function start(){
		
	}
	public function postEvent(evt:FSMEvent){
	
		var ret:String = "";
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		
		switch(evt.msg){
			case "short.Bag1":
				action.msg = "action.bag1";
				ActionManager.Run(action);
				break;
			case "short.Bag2":
				action.msg = "action.bag2";
				ActionManager.Run(action);
				break;
			case "short.Battle":
			
				ret = "open.select";
				break;
				
				
			case "long.Bag1":
				action.msg = "we.bag1.info";
				ActionManager.Run(action);
				break;
			case "long.Bag2":
				action.msg = "we.bag2.info";
				ActionManager.Run(action);
				break;
			case "long.Battle":
				action.msg = "we.battle.info";
				ActionManager.Run(action);
				break;
				
			
		
		}
		
		return ret;
		
	}


}