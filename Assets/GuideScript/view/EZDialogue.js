#pragma strict
//this code is old,the new is EZGuideDialogue!!!!
class EZDialogue extends MonoBehaviour{
	public var _watiTime:float = 2f;
	public var _label:UILabel = null;
	public var _texts:String[] = null;
	public var _timeSpace:float = 0.2f;
	public var _cursor:UISprite = null;
	public var _box:BoxCollider = null;
	public var _posOffset:Vector3 = Vector3.zero;
	public var timeOffset:float = 1f;
	public var _cursorObj:GameObject = null;
		
	private var curStr_:String = "";
	private var index_:int = 0;
	private var isTrigger_:boolean = false;
	private var	textIndex_:int = 0;
	private var tp_:GeekTweenPosition = null;
	private var oldPos_:Vector3 = Vector3.zero;

	public function Start(){
		oldPos_ = _cursorObj.transform.localPosition;
		showCursor(false);
		_label.text = "";
		InvokeRepeating("showAWord", _watiTime, _timeSpace);
	}
	
	public function showAWord(){
		if(isTrigger_){
			_label.text += curStr_[index_];
			index_++;	
		}
		if((curStr_ != "")&&(index_ > curStr_.Length-1)){
			isTrigger_ = false;
			showCursor(true);
			index_ = 0;
		}
	}
	
	public function showStr():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			_label.text = "";
			showCursor(false);
			index_ = 0;
			if(textIndex_ < _texts.Length){
				curStr_ = _texts[textIndex_];
				isTrigger_ = true;
				textIndex_++;
				isOver = true;
			}else{
				CancelInvoke();
			}
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}
	
	public function get textIndex():int{
		return textIndex_;
	}
	
	public function get dialogueEnd():boolean{
		if(textIndex_ >= _texts.Length){
			Debug.Log("Texts is Over!!!!");
			return true;
		}
		return false; 
	}
	
	public function OnDestroy(){
		CancelInvoke();
	}
	
	public function showCursor(b:boolean){
		if(_box){
			_box.enabled = b;
		}
		_cursor.enabled = b;
		if(b){
			floating();
		}else{
			if(tp_){
				tp_.enabled = b;
			}
		}
	}
	
	public function clearText(){
		_label.text = "";
	}
	
	public function get textLength():int{
		return _texts.Length;
	}
	
	private function floating(){
		_cursorObj.transform.localPosition = oldPos_;
		tp_ = GeekTweenPosition.Begin (_cursorObj, timeOffset, oldPos_ - _posOffset);
		tp_.style = GeekTweener.Style.PingPong;
	}
	
}