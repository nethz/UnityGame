#pragma strict


class EZShopBarCtrl extends MonoBehaviour{

	public var _view:EZShopView;
	
	public function open(){
		_view.menu.open();
	}

	public function close(){
		_view.menu.close();
	}
	
	
	public function setup(player:JsonData.Player){
		_view.menu.setup(player);
		_view.common.setup(player);
	}
}