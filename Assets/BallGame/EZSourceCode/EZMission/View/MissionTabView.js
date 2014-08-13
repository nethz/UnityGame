#pragma strict

class MissionTabView extends MonoBehaviour{
	public var _bg:UISprite = null;
	public var _top:UISprite = null;
	public var _title:UILabel = null;
	public var _scrollBar:UIScrollBar = null;
	public var _outLine:Collider = null;
	public var _manager:MissionItemManager = null;
	
	public function open(){
		_bg.enabled = true;
		_top.enabled = true;
		_title.enabled = true;
		_outLine.enabled = true;
		_scrollBar.gameObject.GetComponent(UIPanel).enabled = true;
		_manager.open();
	}
	
	public function close(){
		_bg.enabled = false;
		_top.enabled = false;
		_title.enabled = false;
		_outLine.enabled = false;
		_scrollBar.gameObject.GetComponent(UIPanel).enabled = false;
		_manager.close();
	}
	
	public function set bg(value:String){
		_bg.spriteName = value;
	}
	
	public function set top(value:String){
		_top.spriteName = value;
	}
	
	public function set title(value:String){
		_title.text = value;
	}
	public function get manager():MissionItemManager{
		return _manager;
	}

}