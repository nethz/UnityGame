#pragma strict

class SettingMainView extends MonoBehaviour{
	public var _sound:SettingSoundView = null;
	public var _wei:SettingWeiView = null;
	public var _other:SettingOtherView = null;
	public var _setShowView:SetShowView = null;
	
	private var isOpen_:boolean  = false;
	
	public function open(){
		isOpen_ = true;
		refresh();
	}
	
	public function close(){
		isOpen_ = false;
		refresh();
	}
	
	public function refresh(){
		if(isOpen_){
			_setShowView.show = true;
			_sound.open();
			_wei.open();
			_other.open();
		}else{
			_setShowView.show = false;
			_sound.close();
			_wei.close();
			_other.close();
		}
	}
	public function get sound():SettingSoundView{
		return _sound;
	}

}