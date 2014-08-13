#pragma strict


class EZShopDiamondCtrl extends MonoBehaviour{

	public var _view:EZShopView;
	
	public function openTask(){
		return _view.diamond.openTask();
	}
	public function close(){
		_view.diamond.close();
	}
}