#pragma strict

class EZEggMainInputState extends StateWithEventMap{
	private var ctrl_:EZEggCtrl = null;
	private var goShop_:boolean = false;
	private var goPet_:boolean = false;
	public function EZEggMainInputState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
		addEvent("money", "egg.main.money");
		addEvent("diamond", "egg.main.diamond");
	}
	
	
	function postEvent(evt:FSMEvent){
	
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var bag:JsonData.Bag = EZBagTable.GetInstance().bag;
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		
		if(bag.overflow()){
				var overflow:EZThiWindowTask = ctrl_.overflowTaskWithShop();
				TaskManager.PushBack(overflow, function(){
					if(overflow.result == EZThiWindowTask.Result.Right){
						goShop_ = true;
					}else if(overflow.result == EZThiWindowTask.Result.Mid){
						goPet_ = true;
					}
				
				});
				TaskManager.Run(overflow);
				return "";
		}else if(evt.msg == "money"){
			ctrl_.anima.changeUI(true);
			if(bag.money < setup.game.draw_money){
				return "";
			}
		}else if(evt.msg == "diamond"){
			ctrl_.anima.changeUI(false);
			if(player.diamond < setup.game.draw_diamond){
				var window:EZWindowTask = ctrl_.goShopTask() as EZWindowTask;
				TaskManager.PushBack(window, function(){
					if(window.okOrCancel){
						goShop_ = true;
					}
				});
				TaskManager.Run(window);
				return "";
			}
		}
		return super.postEvent(evt);
	}
	
	public function update(d:float):String{
		
		if(goShop_){
			return "go.shop";
		}else if(goPet_){
			return "go.petSell";
		}
		return "";
	}
	
	public function start(){
		Debug.Log("start!!!!!");
		goShop_ = false;
	}
	
}