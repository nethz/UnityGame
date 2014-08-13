#pragma strict

class EZInputSelectState extends StateWithEventMap{
	public function EZInputSelectState(){
		addEvent("short.Battle", "open.normal");
		addEvent("long.Battle", "open.info");
		addEvent("long.Bag1", "open.info");
		addEvent("long.Bag2", "open.info");
	}
	public function start(){
		var action:EZIDBoolAction = ActionManager.Create("view.pet.selected") as EZIDBoolAction;
		action.id = EZView.Seat.WeBag1;
		action.val = true;
		ActionManager.Run(action);
		action.id = EZView.Seat.WeBag2;
		action.val = true;
		ActionManager.Run(action);
		
		
		var post:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		post.msg = "open.select";
		ActionManager.Run(post);
		Debug.Log("start start");
	}
	public function postEvent(evt:FSMEvent){
	
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent");
		if(evt.msg == "short.Bag1"){
			action.msg = "swap.bag1";
			ActionManager.Run(action);
		
		}else if(evt.msg == "short.Bag2"){ 
			action.msg = "swap.bag2";
			ActionManager.Run(action);
		}else if(evt.msg == "long.Bag1"){ 
			action.msg = "we.bag1.info";
			ActionManager.Run(action);
		}else if(evt.msg == "long.Bag2"){ 
			action.msg = "we.bag2.info";
			ActionManager.Run(action);
		}else if(evt.msg == "long.Battle"){ 
			action.msg = "we.battle.info";
			ActionManager.Run(action);
		}
		return super.postEvent(evt);
	}

	public function over(){
	
		var action:EZIDBoolAction = ActionManager.Create("view.pet.selected") as EZIDBoolAction;
		action.id = EZView.Seat.WeBag1;
		action.val = false;
		ActionManager.Run(action);
		action.id = EZView.Seat.WeBag2;
		action.val = false;
		ActionManager.Run(action);
		
		
		
		var post:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		post.msg = "close.select";
		Debug.Log("over over");
		ActionManager.Run(post);
	}
}