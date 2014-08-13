#pragma strict

class EZShopBagNormalState extends StateWithEventMap{
	private var bag_:EZShopBagCtrl;
	private var goMoney_:boolean = false;
	private var goDiamond_:boolean = false;
	
	public function EZShopBagNormalState(bag:EZShopBagCtrl){
		bag_ = bag;
	}
	function postEvent(evt:FSMEvent):String{
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		if(evt.msg == "money_bag"){ 
			var bag:EZBagTable = EZBagTable.GetInstance();
			var bagMoney:int = setup.data.shop.sellBag.getMoney(bag.bag.max);
			if( bagMoney <=  bag.bag.money){
				var moneyWindow:EZWindowTask = bag_.confirmMoneyTask(bagMoney);
				TaskManager.PushBack(moneyWindow,function(){
					if(moneyWindow.okOrCancel){
						goMoney_ = true;
					}
				});
				TaskManager.Run(moneyWindow);
			}else{
				return "shop.bag.nomoney";
			}
		}else if(evt.msg == "diamond_bag"){
			var player:EZPlayerTable = EZPlayerTable.GetInstance();
			var bagDiamond:int = setup.data.shop.sellBag.getDiamond();
			if(bagDiamond <= player.data.diamond){
				var diamondWindow:EZWindowTask = bag_.confirmDiamondTask(bagDiamond);
				TaskManager.PushBack(diamondWindow,function(){
					if(diamondWindow.okOrCancel){
						goDiamond_ = true;
					}
				});
				TaskManager.Run(diamondWindow);
			}else{
				return "shop.bag.nodiamond";
			}
		}
		return super.postEvent(evt);
	}
	
	public function update(d:float):String{
		
		if(goMoney_){
			return "shop.bag.money";
		}else if(goDiamond_){
			return "shop.bag.diamond";
		}
		return "";
	}
	
	public function start(){
		Debug.LogWarning("EZShopBagNormalState");
		goMoney_ = false;
		goDiamond_ = false;
		
	}
	
	public function over(){
	
	}
}