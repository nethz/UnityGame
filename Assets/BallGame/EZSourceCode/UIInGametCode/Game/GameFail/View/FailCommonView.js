#pragma strict

class FailCommonView extends MonoBehaviour{
	public var _panel:UIPanel;
	public var _countdown:FailCountdownView;
	public var _title:GameTitleView;
	
	public function get title():GameTitleView{
		return _title;
	}

	public function get countdown():FailCountdownView{
		return _countdown;
	}
	public function open(){
		_panel.enabled = true;
	}
	public function close(){
		_panel.enabled = false;
	}
}
	