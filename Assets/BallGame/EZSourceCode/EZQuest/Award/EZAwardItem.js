#pragma strict

class EZAwardItem extends MonoBehaviour{

	
	public var _icon:UISprite;
	public var _label:UILabel;
	
	public function open(){
		setEnabled(true);
	}
	
	public function close(){
		setEnabled(false);
	}
	
	private function setEnabled(enabled:boolean){
		_icon.enabled = enabled;
		_label.enabled = enabled;
	}
	
}