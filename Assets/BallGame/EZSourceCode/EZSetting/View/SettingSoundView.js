#pragma strict

class SettingSoundView extends MonoBehaviour{
	public var _checkBoxMusic:EZCheckBox = null;
	public var _checkBoxEffect:EZCheckBox = null;
	public var _setShowView:SetShowView = null;
	
	private var isOpen_:boolean = false;
	public function setup(data:JsonData.SoundSetup){
	
		_checkBoxEffect.state = data.sound;
		_checkBoxMusic.state = data.music;
	
	
	}
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
			_checkBoxMusic.show = true;
			_checkBoxEffect.show = true;
			_setShowView.show = true;
		}else{
			_checkBoxMusic.show = false;
			_checkBoxEffect.show = false;
			_setShowView.show = false;
		}
	}
	
}