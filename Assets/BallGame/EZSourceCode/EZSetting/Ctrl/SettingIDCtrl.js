#pragma strict

class SettingIDCtrl extends MonoBehaviour{
	public var _view:SettingIDView = null;
	
	public function open(){
		_view.open();
	}
	
	public function close(){
		_view.close();
	}
}