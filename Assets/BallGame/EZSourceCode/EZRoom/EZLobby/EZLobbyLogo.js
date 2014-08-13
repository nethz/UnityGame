#pragma strict
class EZLobbyLogo extends MonoBehaviour{
	public var _box:BoxCollider;
	public var _panel:UIPanel;
	public var _touch:EZFlicker;
	public var _sprite:UISprite;
	
	public function Awake(){
		this.close();
		_touch.enabled = false;
	}
	public function close(){
		_box.enabled = false;
		
		_touch.enabled = false;
		_panel.enabled = false;
	}
	public function open(){
		_box.enabled = true;
		_panel.enabled = true;
	}
	public function fadeIn():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;//TweenAlpha.Begin();
		task.init = function(){
			_panel.alpha = 0.0f;
			this.open();
			ta = TweenAlpha.Begin(_panel.gameObject, 0.3, 1.0f);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function fadeOut():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			_panel.alpha = 1.0f;
			ta = TweenAlpha.Begin(_panel.gameObject, 0.3, 0.0f);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		task.shutdown = function(){
			this.close();
		};
		return task;
	}
	public function showTouch(){
		_touch.enabled = true;
	}
}