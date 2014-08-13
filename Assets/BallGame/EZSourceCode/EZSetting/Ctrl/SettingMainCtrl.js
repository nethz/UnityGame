#pragma strict

class SettingMainCtrl extends MonoBehaviour{
	public var _view:SettingMainView = null;
	public var _fly:SettingItemFly = null;
	
	public function get view():SettingMainView{
		return _view;
	}
	public function open(){
		_view.open();
	}
	
	public function close(){
		_view.close();
	}
	
	public function openTask():Task{
		_fly.openTask();
	}
	
	public function closeTask():Task{
		_fly.closeTask();
	}
}