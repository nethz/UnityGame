#pragma strict

class EZFailShopState extends State{


	private var comeIn_:boolean  = false;
	private var context_:EZModelContext = null;
	private var isRevive_:boolean = false;
	private var shopBack_:boolean = false;
	public function EZFailShopState(context:EZModelContext){
		context_ = context;
	}
	public function start(){
		comeIn_ = false;
		isRevive_ = false;
		shopBack_ = false;
		context_.pause = true;
		var shopInGame:EZShopInGame = EZShopInGame.GetInstance();
		shopInGame.diamond.paymentOver  = paymentOver;
		var task:Task = shopInGame.openTask();
		TaskManager.PushBack(task, function(){
			comeIn_ = true;
		});
		TaskManager.Run(task);
	}
	function paymentOver(succeed:boolean){

		if(succeed){
			isRevive_ = true;
		}else{
			shopBack_ = true;
		}
		
	}
	function update(d:float):String{
		
		if(isRevive_){
			return "fight.fail.web";
		}
		if(shopBack_){
			return "fight.fail.revive";
		}
		return "";
	
	}
	function postEvent(evt:FSMEvent){
		if(comeIn_){
			if(evt.msg == "shop_back"){
				return "fight.fail.revive";
			}/*else if(evt.msg == "shop_do"){
				return "fight.revive";
			}*/
		}
		return "";
	}
	public function over(){
		context_.pause = false;
		var shopInGame:EZShopInGame = EZShopInGame.GetInstance();
		shopInGame.close();
	}
}