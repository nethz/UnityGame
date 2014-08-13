#pragma strict


class EZShopEnergyCtrl extends MonoBehaviour{

	public var _view:EZShopView;
	public var _begin:String;
	public var _end:String;
	
	public var _ok:String;
	public var _cancel:String;
	public function getWindowTask():EZWindowTask{
	
		
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _begin + setup.game.ap_diamond.ToString() + _end;
		window.ok = _ok;
		window.cancel = _cancel;
		return window;
	
	}
}