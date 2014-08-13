#pragma strict

class EZShopState extends State{
	private var loading_:EZShopLoadingCtrl = null;
	public function EZShopState(loading:EZShopLoadingCtrl){
		loading_ = loading;
	}
	
	public function postEvent(evt:FSMEvent):String{
		if(evt.msg == "reload"){
			loading_.reload();
		}else if(evt.msg == "weixin"){
			return "go.weixin";
		}
		return super.postEvent(evt);
	}
}