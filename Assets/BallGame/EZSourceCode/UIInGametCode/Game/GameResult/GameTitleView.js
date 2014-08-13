#pragma strict


class GameTitleView extends GameBaseView{

	
	public var _titleLab:UILabel;
	public var _bg:UISprite;
	public var _showOffset:Vector3 = Vector3.zero;
	private var showTitlePos_:Vector3;
	private var hideTitlePos_:Vector3;
	public var _showAndHideTime:float = 2f;
	public var _methodTp:GeekTweener.Method;
	public function Start(){
		hideTitlePos_ = this.gameObject.transform.localPosition;
		showTitlePos_ = hideTitlePos_ + _showOffset;
	}
	public function pullTask():Task{
		var task:Task = new Task();
		
		var tp:GeekTweenPosition = null;
		task.init = function(){
			_titleLab.enabled = true;
			_bg.enabled = true;
			tp = GeekTweenPosition.Begin(gameObject, _showAndHideTime, showTitlePos_);
			tp.method = _methodTp;
		};
		
		
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};	
		return task;
	}
	public function pushTask():Task{
		var task:Task = new Task();
		
		var tp:GeekTweenPosition = null;
		task.init = function(){
			Debug.LogWarning("hide!!!" + hideTitlePos_);
			tp = GeekTweenPosition.Begin(gameObject, _showAndHideTime, hideTitlePos_);
			tp.method = _methodTp;
		};
		task.shutdown = function(){
			_titleLab.enabled = false;
			_bg.enabled = false;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};	
		return task;
	}
	public function setup(title:String){
		setTitle(title);
	}
	
	public function setTitle(title:String){
		_titleLab.text = title;
	}
	
}
	