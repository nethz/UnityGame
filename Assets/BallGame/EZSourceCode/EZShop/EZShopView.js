#pragma strict

class EZShopView extends MonoBehaviour {
	public var _menu:EZShopMainMenuView;
	public var _diamond:EZShopDiamondView;
	public var _bag:EZShopBagView;
	public var _ap:EZShopAPView;
	public var _common:EZShopCommonView;
	
	
	public function get common():EZShopCommonView{
		return _common;
	}
	public function get menu():EZShopMainMenuView{
		return _menu;
	}
	
	public function get diamond():EZShopDiamondView{
		return _diamond;
	}
	
	public function get bag():EZShopBagView{
		return _bag;
	}
	
	public function get ap():EZShopAPView{
		return _ap;
	}
}