#pragma strict

class EZLobbyShopInState  extends StateWithEventMap{

	private var ui_:EZUICtrl = null;
	private var isOver_:boolean = false;
	
	
	public function EZLobbyShopInState(ui:EZUICtrl){
		//addEvent("awake", "backLobby");
		ui_ = ui;
	}
	
	public function start(){
		Debug.Log("EZLobbyShopInState");
		var shopIn:Task = ui_.shopIn();
		isOver_ = false;
		TaskManager.PushBack(shopIn, function(){
			
			Debug.Log("over");
			isOver_ = true;
		});
		TaskManager.Run(shopIn);
	}
	
	function postEvent(evt:FSMEvent){
	
		Debug.Log("FSMEvent" + evt.msg );
		if(isOver_ && evt.msg == "onForce"){
			return "back";
		}
		
		return super.postEvent(evt);
		
	}
	
}