#pragma strict

class EZInfo extends MonoBehaviour{
	public var _info:UILabel;
	public var _time:float;
	public var _begin:Vector3;
	public var _end:Vector3;
	private var texts_:Array = new Array();
	private var isBusy_:boolean =false;
	public function get isBusy():boolean{
		return isBusy_;
	}
	public function hide(){
		_info.enabled = false;
	}
	public function show(){
		_info.enabled = true;
	}
	
	public function Awake(){
		_begin = this.transform.localPosition;
	}
	
	private function rollFinished(){
		isBusy_ = false;
		this.transform.localPosition = _begin;
		
	}
	public function rollTask(text:String):Task{
		var task:Task = new Task();
		var tp:TweenPosition = null;
		task.init = function(){ 
		
			this.transform.localPosition = _begin;
			_info.text = text;
			var bounds:Bounds = NGUIMath.CalculateAbsoluteWidgetBounds(this.transform);
			var scale:Vector3 = Geek.GetWorldScale(this.transform.parent);
			
			var l:float = bounds.extents.x/scale.x *2;
			var time:float = _time*(_begin.x - _end.x + l)/(_begin.x - _end.x);
			tp  = TweenPosition.Begin(this.gameObject, time, _end - Vector3(l, 0, 0));
			tp.method = UITweener.Method.Linear;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		task.shutdown = function(){
			tp = null;
		};

		
		return task;
	}
	private function roll(text:String){
		
		_info.text = text;
		isBusy_ = true;
		var b:Bounds = NGUIMath.CalculateAbsoluteWidgetBounds(this.transform);
		var scale:Vector3 = Geek.GetWorldScale(this.transform.parent);
		var l:float = b.extents.x/scale.x *2;
		var time:float = _time*(_begin.x - _end.x + l)/(_begin.x - _end.x);
		var tp:TweenPosition = TweenPosition.Begin(this.gameObject, time, _end - Vector3(l, 0, 0));
		tp.method = UITweener.Method.Linear;
		tp.eventReceiver = this.gameObject;
		tp.callWhenFinished = "rollFinished";
	}
	function addText(text:String){
		texts_.push(text);
	}
	public function Update(){
	//	if(!isBusy_ && texts_.length != 0){
	//		roll(texts_.shift());
	//	}
	}
}