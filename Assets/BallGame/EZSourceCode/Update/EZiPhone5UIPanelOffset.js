#pragma strict
class EZiPhone5UIPanelOffset extends EZScreen{
	public var _panel:UIPanel = null;
	public var _range:Vector4 = Vector4.zero;
	public function Awake(){
		super.Awake();
		if(this.iPhone5){
			_panel.clipRange += _range;
		}
	}
}