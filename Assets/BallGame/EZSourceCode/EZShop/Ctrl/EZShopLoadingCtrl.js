#pragma strict


class EZShopLoadingCtrl extends MonoBehaviour{

	public var _view:EZShopView;
	public var _ap:EZApCtrl;
	public function reload(){
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		var bag:EZBagTable = EZBagTable.GetInstance();
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		_view.menu.setup(player.data);
		_view.common.setup(player.data, bag.bag);
		_view.bag.setup(setup.data.shop, bag.bag);
		_ap.refresh();
		
	}
}