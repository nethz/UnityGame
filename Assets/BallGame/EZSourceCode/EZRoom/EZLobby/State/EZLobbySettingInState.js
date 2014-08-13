#pragma strict

class EZLobbySettingInState  extends StateWithEventMap{

	private var ui_:EZUICtrl = null;
	private var isOver_:boolean = false;
	
	
	public function EZLobbySettingInState(ui:EZUICtrl){
		ui_ = ui;
	}
	
	public function start(){
		Debug.Log("EZLobbySettingInState");
		var settingIn:Task = ui_.settingIn();
		isOver_ = false;
		TaskManager.PushBack(settingIn, function(){
			
			Debug.Log("over");
			isOver_ = true;
		});
		TaskManager.Run(settingIn);
	}
	
	function postEvent(evt:FSMEvent){
	
		Debug.Log("FSMEvent" + evt.msg );
		if(isOver_ && evt.msg == "onForce"){
			return "back";
		}
		
		return super.postEvent(evt);
		
	}
	
}