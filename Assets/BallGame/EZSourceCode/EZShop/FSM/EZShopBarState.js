#pragma strict

class EZShopBarState extends StateWithEventMap{
	private var loading_:EZShopLoadingCtrl = null;
	private var bar_:EZShopBarCtrl;
	public function EZShopBarState(loading:EZShopLoadingCtrl, bar:EZShopBarCtrl){
		
		addEvent("go_diamond", "shop.diamond");
		addEvent("go_bag", "shop.bag.normal");
		addEvent("go_back", "go.home");
		bar_ = bar;
		loading_ = loading;
	}
	
	public function start(){
		bar_.open();
		loading_.reload();
	}
	public function over(){
		bar_.close();
	}
}