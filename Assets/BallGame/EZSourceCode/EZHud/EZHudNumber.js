#pragma strict

class EZHudNumber extends MonoBehaviour{
	
		
	public enum Size{
		Small = 0,
		Middle = 1,
		Big = 2,
		Large = 3,
		Great = 4,

	}
	public enum EzColor{
		Red,
		Green,
		Blue,
		Yellow,
		White,
	}
	public var _red:Color = Color.red;
	public var _green:Color = Color.green;
	public var _blue:Color = Color.blue;
	public var _yellow:Color = Color.yellow;
	public var _white:Color = Color.white;
	
	public var _up1:float = 10.0f;
	public var _up2:float = 40.0f;
	public var _time1:float = 0.5f;
	public var _time2:float = 0.5f;
	
	public var _sizeTime:float = 0.3f;
	public var _waitSizeTime:float = 0f;
	
	class Scale{
		var normal:float = 0;
		var bigger:float = 0;
		var smaller:float = 0;
	}
	var _sizeList:Scale[] = null;
	var _label:UILabel = null;
	var _local:Vector3; 
	
	private var from_:float = 0;
	private var to_:float = 0;
	private var localSize_:Vector3;
	public var _change:boolean = true;
	private var size_:EZHudNumber.Size = EZHudNumber.Size.Small;
	public var _method1:GeekTweener.Method = GeekTweener.Method.easeInQuart;
	public var _method2:GeekTweener.Method = GeekTweener.Method.easeInQuart;
	function set size(value:EZHudNumber.Size){
		this.size_ = value;
	}
	function getScale(r:float, scale:Scale):float{
		var s:float = scale.normal;
		
		if(_change){
			
			if(Mathf.Abs(this.from_) > Mathf.Abs(this.to_)){
				s = scale.normal *(1.0f-r)+ scale.smaller*r;
			}else if(Mathf.Abs(this.from_) < Mathf.Abs(this.to_)){
				s = scale.normal *(1.0f-r)+ scale.bigger*r;
			}
		}
		return s;
	}
	function getSize(r:float):Vector3{
		if(this.size_ < 0 || this.size_ >= this._sizeList.Length){
			return localSize_;
		}
		var scale:float = this.getScale(r, this._sizeList[this.size_]);
		return scale*localSize_;
	}
	function get size():EZHudNumber.Size{
		return this.size_;
	
	}
	function Awake(){
		_label.enabled = false;
		_local = this.transform.localPosition;
		localSize_ = this.transform.localScale;
	}
	function Start(){
	} 
	
	
	public function set color(value:EZHudNumber.EzColor){
		var color:EZHudNumber.EzColor = value;
		switch(color){
		case EZHudNumber.EzColor.Red:
			setColor(_red);
			break;
		case EZHudNumber.EzColor.Green:
			setColor(_green);
			break;
		case EZHudNumber.EzColor.Blue:
			setColor(_blue);
			break;
		case EZHudNumber.EzColor.Yellow:
			setColor(_yellow);
			break;
		case EZHudNumber.EzColor.White:
			setColor(_white);
			break;
		}
	}
	public function setColor(color:Color){
		_label.color = color;
	}
	
	public function moveOver(task:EZOverTask){
		task.over = true;
	}
	public function setAlpha(alpha:float){
		_label.color.a = alpha;
	} 

	private function getText(r:float):String{
		var round:int = to_;
		if(_change){
			round = Mathf.RoundToInt( from_ *(1.0f-r)+ to_*r);
		}
		var text:String;
		if(round >= 0){
			text = "+" + round;
		}else{
			text =  (-round).ToString();
		}
		return text;
	}
	public function setNumber(from:int, to:int){
		this.from_ = from;
		this.to_ = to;
		_label.text = this.getText(1.0f);
	}
	private function moveTask(time:float, y:float, method:GeekTweener.Method):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(this._label.gameObject, time, Vector3(_local.x, _local.y+y, _local.z-3));
			tp.method = method;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}else{
				return true;
			}
		};
		return task;
	}
	private function clearTask():Task{
		var task:Task = new Task();
		return task;
	
	}
	private function alphaTask():Task{
		
		var task:Task = new Task();
		
		var ta:TweenAlpha = null;
		task.init = function(){
			_label.color.a = 1;
			ta = TweenAlpha.Begin(this._label.gameObject, _time2, 0.0f);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}else{
				return true;
			}
		};
		return task;
	}
	private function change(r:float){
		
		transform.localScale = this.getSize(r);
		_label.text = this.getText(r);
	
	}
	private function changeTask():Task{
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(_waitSizeTime);
		var tl:TaskList = new TaskList();
		
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject, _sizeTime, 0.0f, 1.0f, this.gameObject, "change");
		};
		task.isOver = function():boolean{
			if(tv && tv.enabled)
				return false;
			
			return true;
			
		};
		tl.push(wait);
		tl.push(task);
		return tl;
	}
	private function appearTask():Task{
		return moveTask(_time1, _up1, _method1);
	}
	private function disappearTask():Task{
		var mt:MultiTask = new MultiTask();
		mt.push(alphaTask());
		mt.push(moveTask(_time2, _up2 + _up1, _method2));
		
		return mt;
	}
	private function upTask():Task{
		var tl:TaskList = new TaskList();
		tl.push(appearTask());
		tl.push(disappearTask());
		return tl;
	}
	
	
	public function showTask():Task{
		var mt:MultiTask = new MultiTask();
		
		mt.push(upTask());
		mt.push(changeTask());
		
		TaskManager.PushFront(mt, function(){
			this.change(0);
			this._label.gameObject.transform.localPosition = _local;
			_label.enabled = true;
		
		});
		TaskManager.PushBack(mt, function(){
			_label.enabled = false;
		});
		return mt;
		
		
	}
	
	
	
}
