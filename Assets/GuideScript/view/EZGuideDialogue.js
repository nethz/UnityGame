#pragma strict

class EZGuideDialogue extends MonoBehaviour{
	enum ShowType{
		WORD,
		LINE,
		NONE,
	}
	class ShowText{
		public var text:String = "";
		public var type:ShowType = ShowType.WORD;
	}
	
	public var _texts:ShowText[];
	public var _label:UILabel;
	public var _byWordSpaceTime:float = 0.5f;
	public var _lineNumber:float = 17;
	public var _lineSpaceTime:float = 2f;
	public var _lineTextOffse:Vector3 = Vector3.zero;
	public var _lineShowTime:float = 1.5f;
	public var _lineLabelHeightSpace:Vector3 =Vector3.zero;
	public var _cursor:EZGuideCursor = null;
	
	private var index_:int = 0;
	private var textByWord_:String = "";
	private var wordIndex_:int = 0;
	private var oldLabelPosition:Vector3 = Vector3.zero;
	private var stringEnd_:boolean = false;
	private var labels_:UILabel[];
	
	public function Awake(){
		_label.text = "";
		oldLabelPosition = _label.transform.localPosition;
	}
	
	public function Start(){
		showCursor(false);
	}
	
	public function showFirstText():Task{
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(2f);
		tl.push(wait);
		tl.push(showTextTask());
		return tl;
	}
	
	public function showTextTask():Task{
		var task:Task = new Task();
		stringEnd_ = false;
		task.init = function(){
			showText();
		};
		task.isOver = function(){
			return stringEnd_;
		};
		return task;
	}
	
	public function showTextByIndex(index:int){
		showCursor(false);
		clearText();
		if(index < _texts.Length){
			if(_texts[index_].type == ShowType.WORD){
				showTextByWord(_texts[index].text);
			}else if(_texts[index].type == ShowType.LINE){
				showTextByLine(_texts[index].text);
			}else{
				showTextByNone(_texts[index].text);
			}
		}
	}
	
	private function showText(){
		showCursor(false);
		clearText();
		if(index_ < _texts.Length){
			if(_texts[index_].type == ShowType.WORD){
				showTextByWord(_texts[index_].text);
			}else if(_texts[index_].type == ShowType.LINE){
				showTextByLine(_texts[index_].text);
			}else{
				showTextByNone(_texts[index_].text);
			}
			index_++;
		}
	}
	
	public function clearText(){
		if(_label){
			_label.text = "";
		}
		if(labels_ && labels_.Length >0){
			for(var i:int = 0;i<labels_.Length;++i){
				if(labels_[i]){
					GameObject.DestroyObject(labels_[i].gameObject);
				}
			}
		}
	}
	
	public function get textIndex():int{
		return index_;
	}
	
	public function get textLength():int{
		return _texts.Length;
	}
	
	public function get dialogueEnd():boolean{
		if(index_ >= _texts.Length){
			Debug.Log("Texts is Over!!!!");
			return true;
		}
		return false; 
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
	
	private function showTextByWord(text:String){
		textByWord_ = text;
		wordIndex_ = 0;
		InvokeRepeating("showAWord",1f, _byWordSpaceTime);
	}
	
	private function showAWord(){
		_label.text += textByWord_[wordIndex_];
		wordIndex_++;
		if((textByWord_ != "")&&(wordIndex_ > textByWord_.Length-1)){
			stringEnd_ = true;
			showCursor(true);
			CancelInvoke();
		}
	}
	
	private function showTextByLine(text:String){
		lineTextsInit(text);
		var targetObj:GameObject = null;
		var tatgetPos:Vector3 = Vector3.zero;
		var waitTime:float = 0f;
		for(var i:int = 0;i<labels_.Length;++i){
			targetObj = labels_[i].gameObject;
			tatgetPos = oldLabelPosition + _lineLabelHeightSpace * i;
			waitTime = _lineShowTime*i + _lineSpaceTime*i;
			if(i >= labels_.Length -1){
				showOneLine(targetObj,waitTime,tatgetPos,true);
			}else{
				showOneLine(targetObj,waitTime,tatgetPos,false);
			}
		}
	}
	
	private function lineTextsInit(text:String){
		var line:int = Mathf.CeilToInt(text.Length/_lineNumber);
		labels_ = new UILabel[line];
		for(var i:int = 0;i<line;++i){
			labels_[i] = createLabel();
			labels_[i].gameObject.name = "Label" + i;
			labels_[i].transform.localPosition = oldLabelPosition - _lineTextOffse;
			labels_[i].transform.localPosition += _lineLabelHeightSpace*i;
			labels_[i].color.a = 0;
			if(i == line-1){
				var endNum:int = text.Length - (line-1)*_lineNumber;
				labels_[i].text = text.Substring(i*_lineNumber,endNum);
			}else{
				labels_[i].text = text.Substring(i*_lineNumber,_lineNumber);
			}
			
		}
	}
	
	private function showOneLine(obj:GameObject,time:float,target:Vector3,over:boolean){
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(time);
		wait.shutdown = function(){
			var tp:TweenPosition = TweenPosition.Begin(obj,_lineShowTime,target);
			TweenAlpha.Begin(obj,_lineShowTime,1f);
			if(over){
				tp.eventReceiver = this.gameObject;
				tp.callWhenFinished = "showTextByLineOver";
			}
		};
		TaskManager.Run(wait);
	}
	
	private function createLabel():UILabel{
		var obj:GameObject = GameObject.Instantiate(_label.gameObject);
		var label:UILabel = obj.GetComponent(UILabel) as UILabel;
		obj.transform.parent = _label.transform.parent;
		obj.transform.localPosition = _label.transform.localPosition;
		obj.transform.localScale = _label.transform.localScale;
		return label;
	}
	
	private function showTextByLineOver(){
		stringEnd_ = true;
		showCursor(true);
	}
	
	private function showTextByNone(text:String){
		_label.text = text;
		stringEnd_ = true;
		showCursor(true);
	}
	
}