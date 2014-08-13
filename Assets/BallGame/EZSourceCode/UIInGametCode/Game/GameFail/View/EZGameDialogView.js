#pragma strict

class EZGameDialogView extends EZScreen{
	public var _background:UISprite = null;
	public var _text:UILabel = null;
	private var begin_:Vector3 = Vector3.zero;
	public var _end:Vector3 = Vector3.zero;
	public var _time:float = 0.35f;
	public var _box:BoxCollider = null;
	//public var _arrow:EZHudArrow = null;
	public var _cursor:EZDialogueCursor = null;
	private var texts_:String[] = null;
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	private var isTouch_:boolean = false;
	public var _iPhone5BeginOffset = Vector3.zero;
	public var _iPhone5EndOffset = Vector3.zero;
	private var index_:int  = 0; 
	public function Awake(){
		super.Awake();
		
		begin_ = this.gameObject.transform.localPosition;
		if(this.iPhone5){
			this._end += _iPhone5EndOffset;
			//this._end2 += _iPhone5EndOffset;
			begin_ = this.gameObject.transform.localPosition+ _iPhone5BeginOffset;
		}
		_box.enabled = false;
	}
	public function OnClick(){
		isTouch_ = true;
	}
	private function showTask(end:Vector3):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(this.gameObject, _time, end);
			tp.method = _method;
		};
		task.isOver = function(){
			if(tp && tp.enabled){
				return false;
			}
			
			return true;
		};
		return task;
	}
	
	public function showTextTask(text:String,callback:Function):Task{
		var task:Task = showTextTask(text);
		TaskManager.PushBack(task, function(){
			Debug.Log("<=======callback=============>");
			callback();
		});
		return task;
	}
	
	public function showTextTask(text:String):Task{
		Debug.Log("<=========showTextTask==================>" + text);
		var tl:TaskList = new TaskList();
		TaskManager.PushFront(tl, function(){
			_box.enabled = true;
			
			_text.text = text;
			_text.enabled = true; 
			//_arrow.isEnabled = true;
			_cursor.show();
		});
		var show:Task = showTask(this._end);
		TaskManager.PushBack(show, function(){
			isTouch_ = false;
		});
		tl.push(show);
		
		
		var touch:Task = new Task();
		
		touch.isOver = function():boolean{
			return isTouch_;
		};
		
		tl.push(touch); 
		tl.push(hideTask()); 
		 
		TaskManager.PushBack(tl, function(){
			_text.enabled = false; 
			_box.enabled = false; 
			//_arrow.isEnabled = false;
			_cursor.hide();
		});
		return tl;
	}
	
	
	public function showTextTask(texts:String[]):Task{
		texts_ = texts;
		index_ = 0;
		var tl:TaskList = new TaskList();
		TaskManager.PushFront(tl, function(){
			_box.enabled = true;
			_text.text = texts_[index_];
			_text.enabled = true; 
			//_arrow.isEnabled = true;
			_cursor.show();
		});
		var show:Task = showTask(this._end);
		TaskManager.PushBack(show, function(){
			isTouch_ = false;
		});
		tl.push(show);
		
		
		var touch:Task = new Task();
		
		touch.isOver = function():boolean{
			if(isTouch_){
				isTouch_ = false;
				index_++;
				if(index_ >= texts_.Length){
					return true;
				}
				_text.text = texts_[index_];
			}
			return false;
			
		};
		
		tl.push(touch); 
		tl.push(hideTask()); 
		 
		TaskManager.PushBack(tl, function(){
			_text.enabled = false; 
			_box.enabled = false; 
			//_arrow.isEnabled = false;
			_cursor.hide();
		});
		return tl;
	}

	function OnPress(state:boolean){
		if(state){
			_cursor.stopFloat();
		}else{
			_cursor.show();
		}
	}

	private function hideTask():Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(this.gameObject, _time, begin_);
			tp.method = _method;
		};
		task.isOver = function(){
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}

}