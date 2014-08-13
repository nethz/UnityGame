#pragma strict

class EZShopCtrl extends MonoBehaviour{
	public var _bar:EZShopBarCtrl;
	public var _diamond:EZShopDiamondCtrl;
	public var _energy:EZShopEnergyCtrl;
	public var _bag:EZShopBagCtrl;
	
	public var _loading:EZShopLoadingCtrl;
	public function get bar():EZShopBarCtrl{
		return _bar;
	}
	public function get diamond():EZShopDiamondCtrl{
		return _diamond;
	}
	public function get energy():EZShopEnergyCtrl{
		return _energy;
	}
	public function get bag():EZShopBagCtrl{
		return _bag;
	}
	
	
}