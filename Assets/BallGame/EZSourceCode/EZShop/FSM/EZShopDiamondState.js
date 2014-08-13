#pragma strict

class EZShopDiamondState extends State{
	private var diamond_:EZShopDiamondCtrl;
	private var loading_:EZShopLoadingCtrl = null;
	private var goBack_:boolean = false;
	private var open_:Task = null;
	public function EZShopDiamondState(diamond:EZShopDiamondCtrl, loading:EZShopLoadingCtrl){
		diamond_ = diamond;
		loading_ = loading;
	}
	function postEvent(evt:FSMEvent){
		
		if(evt.msg == "go_back" && open_ == null){
			return "shop.bar.normal";
		
		}
		return "";
	}
	 
	public function start(){
		goBack_ = false;
		open_ = diamond_.openTask();
		TaskManager.PushBack(open_, function(){
			open_ = null;
			loading_.reload();
		});
		TaskManager.Run(open_);
		Debug.Log("start!");
	}
	public function over(){
		diamond_.close();
	}
	
}