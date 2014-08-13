#pragma strict

class SettingOtherView extends MonoBehaviour{
	public var _setShowView:SetShowView = null;
	
	private var isOpen_:boolean = false;
	
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
		}else{
			_setShowView.show = false;
		}
	}
}