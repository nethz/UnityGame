#pragma strict

class EZCryButton extends MonoBehaviour{
	public var _backGroup:UISprite;
	public var _label:UILabel;
	public var _box:BoxCollider;
	public function set isEnabled(value:boolean){
		
		_backGroup.enabled = value;
		if(_label){
			_label.enabled = value;
		}
		_box.enabled = value;
	}
	
}