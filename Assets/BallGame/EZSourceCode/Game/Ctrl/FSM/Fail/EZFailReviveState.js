#pragma strict


class EZFailReviveState extends State{
	private var isOver_:boolean = false;
	private var context_:EZModelContext = null;
	private var goShop_:boolean = false;
			
	public function EZFailReviveState(context:EZModelContext){
		context_ = context;
	}
	function start(){
		context_.pause = false;
		goShop_ = false;
		EZGameFailView.GetInstance().revive.open();
		
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		//var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		EZGameFailView.GetInstance().revive.has = player.diamond;
		EZGameFailView.GetInstance().revive.need = setup.game.revive_diamond;
	}
	function over(){
		context_.pause = true;
		EZGameFailView.GetInstance().revive.close();
	}
	function update(d:float):String{
		if(goShop_){
			return "fight.fail.shop";
		}
		return "";
	}

	function postEvent(evt:FSMEvent){
	
		if(evt.msg == "reviveOK"){
			var player:JsonData.Player = EZPlayerTable.GetInstance().data;
			
			
			var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
			if(player.diamond >= setup.game.revive_diamond){
				return "fight.fail.web";
			}else{
				var task:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
				task.text = EZDictionary.LookUp("!need_recharge");
				task.ok = EZDictionary.LookUp("!recharge");
				task.cancel = EZDictionary.LookUp("!cancel");
				TaskManager.PushBack(task, function(){
					goShop_ = task.okOrCancel;
				});
				TaskManager.PushFront(task, function(){
					context_.pause = true;
				
				});
				
				
				TaskManager.PushBack(task, function(){
					context_.pause = false;
				
				});
				TaskManager.Run(task);
			}
			
		}
		return "";
	}
	
}