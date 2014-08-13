#pragma strict

class EZHudText extends MonoBehaviour{
	
	
	
	public enum EzColor{
		Red,
		White,
		Green,
		Yellow,
	}
	public var _red:Color = Color.red;
	public var _white:Color = Color.white;
	public var _green:Color = Color.green;
	public var _yellow:Color = Color.yellow;
	//var _sizeList:float[] = null;
	var _label:UILabel = null;
	private var _local:Vector3; 
	private var localSize_:Vector3;
	//public var _material:Material = null; 
	
	
	public var _up1:float = 10.0f;
	public var _up2:float = 40.0f;
	public var _time1:float = 0.5f;
	public var _time2:float = 0.5f;
	
	public var _method1:GeekTweener.Method = GeekTweener.Method.easeInQuart;
	public var _method2:GeekTweener.Method = GeekTweener.Method.easeInQuart;

	function Awake(){
		_label.enabled = false;
		_local = this.transform.localPosition;
		localSize_ = this.transform.localScale;
//		this.renderer.material.shader = Shader.Find("EZ/Side2");
	}
	function Start(){
	
		//var font:UIFont = _label.font;
		//if(_material != null)
		//	font.material = _material;
	} 
	
	public function set color(value:EZHudText.EzColor){
		var color:EZHudText.EzColor = value;
		switch(color){
		case EZHudText.EzColor.Red:
			setColor(_red);
			break;
		case EZHudText.EzColor.Yellow:
			setColor(_yellow);
			break;
		case EZHudText.EzColor.Green:
			setColor(_green);
			break;
		case EZHudText.EzColor.White:
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
	
	public function setText(text:String){
		_label.text = text;
	
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
		var task:Task = upTask();
		
		TaskManager.PushFront(task, function(){
		//	this.change(0);
			this._label.gameObject.transform.localPosition = _local;
			this._label.gameObject.transform.localScale = localSize_;
			_label.enabled = true;
		
		});
		TaskManager.PushBack(task, function(){
			_label.enabled = false;
		});
		return task;
		
		
	}
	
	
	
	
}
