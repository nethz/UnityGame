#pragma strict

class EZShopInGameBack extends MonoBehaviour{
	private var begin_:Vector3 = Vector3.zero;
	private var end_:Vector3 = Vector3.zero;
	
	public var _offset:Vector3 = Vector3.zero;
	public var _topBg:GameObject = null;
	public var _button:UIImageButton = null;
	public var _method:GeekTweener.Method;
	public function Start(){
		begin_ = this.gameObject.transform.localPosition;
		end_ = begin_ + _offset;
		this.close();
	}
	public function openTask():Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		
		task.init = function(){
			_button.enabled = true;
			_topBg.gameObject.transform.localPosition = begin_;
			tp = GeekTweenPosition.Begin(_topBg.gameObject, 0.3, end_);
			tp.method = _method;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function close(){
		_topBg.gameObject.transform.localPosition = begin_;
		_button.enabled = false;
	}

}