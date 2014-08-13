#pragma strict


class EZShopBagState extends State{
	
	private var bag_:EZShopBagCtrl;
	private var open_:Task = null;
	public function EZShopBagState(bag:EZShopBagCtrl){
		bag_ = bag;
	}
	function postEvent(evt:FSMEvent){
		
		if(evt.msg == "go_back" && open_ == null){
			
			return "shop.bar.normal";
		}
		return "";
	}
	
	 
	public function start(){
		open_ = bag_.openTask();
		TaskManager.PushBack(open_, function(){
			open_ = null;
		});
		TaskManager.Run(open_);
		Debug.Log("start!");
	}
	public function over(){
		bag_.close();
	}
}
