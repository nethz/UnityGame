#pragma strict

class EZGuideTyper extends MonoBehaviour{
	public var _texts:EZGuideText[];
	public var _label:UILabel;
	public var _spaceHeight:Vector3 = Vector3.zero;
	public var _oneLineNum:float = 15;
	public var _wordSpaceTime:float = 0.1f;
	//public var _wordNextLineTime:float = 0f;
	public var _addSpace:int = 0;
	public var _lineSpaceTime:float = 2f;
	public var _lineHeightOffset:Vector3 = Vector3.zero;
	public var _lineShowTime:float = 1.5f;
	public var _cursor:EZGuideCursor = null;
	public var _lineMethod:UITweener.Method = UITweener.Method.Linear;
	
	private var index_:int = 0;
	private var text_:EZGuideText;
	private var string_:String = "";
	private var oneTextline_:int = 0;
	private var subStrings_:String[];
	private var wordIndex_:int = 0;
	private var labels_:List.<UILabel> = new List.<UILabel>();
	private var oneTextOver_:boolean = false;
	private var wordLabel_:UILabel = null;
	private var wordString_:String = "";
	private var wordOneLineOver_:boolean = false;
	
	public function Awake(){
		_label.text = "";
	}
	
	public function showTextTask(text:EZGuideText):Task{
		var task:Task = new Task();
		oneTextOver_ = false;
		task.init = function(){
			showTextByText(text);
		};
		task.isOver = function(){
			return oneTextOver_;
		};
		return task;
	}
	
	public function showTextTask(index:int):Task{
		var task:Task = new Task();
		oneTextOver_ = false;
		task.init = function(){
			showTextByIndex(index);
		};
		task.isOver = function(){
			return oneTextOver_;
		};
		return task;
	}
	
	private function initStringArray(str:String){
		oneTextline_ = Mathf.CeilToInt(str.Length/_oneLineNum);
		if(oneTextline_ <= 0) oneTextline_ = 1;
		subStrings_ = new String[oneTextline_];
		for(var i:int = 0;i < oneTextline_;++i){
			if(i != oneTextline_-1){
				subStrings_[i] = str.Substring(i*_oneLineNum,_oneLineNum);
			}else{
				var endNum:int = str.Length - (oneTextline_-1)*_oneLineNum;
				subStrings_[i] = str.Substring(i*_oneLineNum,endNum);
			}
		}
	}
	
	public function showTextByText(text:EZGuideText){
		showCursor(false);
		string_ = text.text;
		initStringArray(string_);
		if(text.clear){
			clear();
		}
		switch(text.style){
			case EZGuideText.Style.NONE:
				showTextNone();
			break;
			case EZGuideText.Style.LINE:
				showTextLine();
			break;
			case EZGuideText.Style.WORD:
				showTextWord();
			break;
		}
	}
	
	//main interface
	public function showTextByIndex(index:int){
		index_ = index;
		if(index_ >= _texts.Length){
			oneTextOver();
			Debug.Log("<--------Typer is over!!!!---------->");
		}else{
			text_ = _texts[index_];
			showTextByText(text_);
		}
	}
	
	private function showTextNone(){
		for(var i:int = 0;i<oneTextline_;++i){
			labels_.Add(createLabel());
			var last:int = labels_.Count -1;
			labels_[last].transform.localPosition -= _spaceHeight*(last);
			labels_[last].text = subStrings_[i];
			if(i == oneTextline_-1 ) oneTextOver();
		}
	}
	
	private function showTextLine(){
		var targetObj:GameObject = null;
		var tatgetPos:Vector3 = Vector3.zero;
		var waitTime:float = 0f;
		for(var i:int = 0;i<oneTextline_;++i){
			labels_.Add(createLabel());
			var last:int = labels_.Count -1;
			labels_[last].transform.localPosition -= _spaceHeight*(last);
			tatgetPos = labels_[last].transform.localPosition;
			labels_[last].transform.localPosition += _lineHeightOffset;
			targetObj = labels_[last].gameObject;
			waitTime = (_lineShowTime+_lineSpaceTime)*i;
			labels_[last].color.a = 0;
			labels_[last].text = subStrings_[i];
			if(i == oneTextline_-1){
				showOneLine(targetObj,waitTime,tatgetPos,true);
			}else{
				showOneLine(targetObj,waitTime,tatgetPos,false);
			}
		}
	}
	
	private function showOneLine(obj:GameObject,time:float,target:Vector3,over:boolean){
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(time);
		wait.shutdown = function(){
			if(obj){
				var tp:TweenPosition = TweenPosition.Begin(obj,_lineShowTime,target);
				var ta:TweenAlpha = TweenAlpha.Begin(obj,_lineShowTime,1f);
				tp.method = _lineMethod;
				ta.method = _lineMethod;
				if(over){
					tp.eventReceiver = this.gameObject;
					tp.callWhenFinished = "oneTextOver";
				}
			}
		};
		TaskManager.Run(wait);
	}
	
	private function showTextWord(){
		var tl:TaskList = new TaskList();
		for(var i:int = 0;i<oneTextline_;++i){
			labels_.Add(createLabel());
			var last:int = labels_.Count -1;
			labels_[last].transform.localPosition -= _spaceHeight*(last);
			/*var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(_wordNextLineTime);
			tl.push(wait);*/
			tl.push(typeOneLabel(labels_[last],subStrings_[i]));
		}
		TaskManager.Run(tl);
		TaskManager.PushBack(tl,function(){
			oneTextOver();
		});
	}
	
	private function typeOneLabel(label:UILabel,str:String):Task{
		var task:Task = new Task();
		wordOneLineOver_ = false;
		task.init = function(){
			wordOneLineOver_ = false;
			wordLabel_ = label;
			wordString_ = str;
			if(wordString_[wordString_.Length - 1] == " "){
				wordString_ = wordString_.TrimEnd();
				for(var i:int = 0; i<_addSpace;++i){
					wordString_ += " ";
				}
			}
			wordIndex_ = 0;
			InvokeRepeating("showAWord",0.1f, _wordSpaceTime);
		};
		task.isOver = function(){
			return wordOneLineOver_;
		};
		return task;
	}
	
	private function showAWord(){
		if((wordString_ == "")||(wordIndex_ > wordString_.Length-1)){
			wordOneLineOver_ = true;
			CancelInvoke();
		}else{
			wordLabel_.text += wordString_[wordIndex_];
			wordIndex_++;
		}
	}
	
	private function oneTextOver(){
		oneTextOver_ = true;
		showCursor(true);
	}
	
	public function get index():int{
		return index_;
	}
	
	public function get textsLength():int{
		return _texts.Length;
	}
	
	public function get textsOver():boolean{
		return index_ >= _texts.Length - 1;
	}
	
	public function clear(){
		if(labels_.Count >0){
			for(var i:int = 0;i<labels_.Count;++i){
				if(labels_[i]){
					GameObject.DestroyObject(labels_[i].gameObject);
				}
			}
		}
		labels_.Clear();
	}

	private function createLabel():UILabel{
		var obj:GameObject = GameObject.Instantiate(_label.gameObject);
		var label:UILabel = obj.GetComponent(UILabel) as UILabel;
		obj.transform.parent = _label.transform.parent;
		obj.transform.localScale = _label.transform.localScale;
		obj.transform.localPosition = _label.transform.localPosition;
		return label;
	}
	
	public function showCursor(show:boolean){
		if(_cursor){
			if(show){
				_cursor.show();
			}else{
				_cursor.hide();
			}
		}
	}
	
}