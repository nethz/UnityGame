#pragma strict

class NameWindow extends MonoBehaviour{
	public var _panel:UIPanel = null;
	public var _boxs:BoxCollider[] = null;
	public var _btnOK:UIImageButton = null;
	public var _btnCancel:UIImageButton = null;
	public var _heroName:UILabel = null;
	
	public function Awake(){
		this.close();
	}
	
	public function open(){
		_panel.alpha = 1f;
		for(var i:int = 0;i < _boxs.length; ++i){
			//_boxs[i].enabled = true;
			_btnOK.isEnabled = true;
			_btnCancel.isEnabled = true;
		}
	}
	
	public function close(){
		_panel.alpha = 0f;
		for(var i:int = 0;i < _boxs.length; ++i){
		
			_btnOK.isEnabled = false;
			_btnCancel.isEnabled = false;
			//_boxs[i].enabled = false;
		}
	}
	
	public function get heroName():String{
		return _heroName.text;
	}
}