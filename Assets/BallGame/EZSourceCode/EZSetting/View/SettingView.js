#pragma strict

class SettingView extends MonoBehaviour{
	public var _idView:SettingIDView = null;
	public var _main:SettingMainView = null;
	
	public function Start(){
		//_idView.close();
		//_main.close();
	}
	
	public function get idView():SettingIDView{
		return _idView;
	}
	
	public function get main():SettingMainView{
		return _main;
	}
	
}