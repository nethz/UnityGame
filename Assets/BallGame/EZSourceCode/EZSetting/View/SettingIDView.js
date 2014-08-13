#pragma strict

class SettingIDView extends MonoBehaviour{
	public var _oldName:UILabel = null;
	public var _newName:UILabel = null;
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
	
	public function set oldName(value:String){
		_oldName.text = value;
	}

	public function get newName():String{
		return _newName.text;
	}
	
}