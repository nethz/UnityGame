#pragma strict

class EZUIHit extends MonoBehaviour{
	public var _go:GameObject;
	public var _number:UILabel;
	public var _hit:UILabel;
	
	public var _scaleTime:float = 0.3f;
	public var _scale1:float = 1f;
	public var _scaleTimeScale1:float = 1f;
	public var _scaleMethod1:UITweener.Method = UITweener.Method.Linear;
	public var _scale2:float = 1f;
	public var _scaleTimeScale2:float = 1f;
	public var _scaleMethod2:UITweener.Method = UITweener.Method.Linear;
	public var _scale3:float = 1f;
	public var _scaleTimeScale3:float = 1f;
	public var _scaleMethod3:UITweener.Method = UITweener.Method.Linear;
	
	public var _valueTime:float = 0.3f;
	public var _valueMethod:GeekTweener.Method = GeekTweener.Method.Linear;
	
	private static var instance_:EZUIHit = null;
	private var hit_:int = 0;
	private var open_:boolean = false;
	private var scale_:Vector3 = Vector3.one;
	
	
	public function Awake(){ 
		this.instance_ = this;
		hit_= 0;
		scale_ = _go.transform.localScale;
		setNumber(hit_);
	}
	public static function GetInstance():EZUIHit{
		return this.instance_;
	}

	public function addHit(hit:int){
		setHit(hit + hit_);
	}
	
	public function setHit(hit:int){
		if(!open_){
			open();
		}
		_go.transform.localScale = scale_;
		var tl:TaskList = new TaskList();
		var ts :TweenScale = null;
		var scaleTask1:Task = new Task();
		scaleTask1.init = function(){
			ts = TweenScale.Begin(_go, _scaleTimeScale1 * _scaleTime, scale_ * _scale1);
			ts.method = _scaleMethod1;
		};
		scaleTask1.isOver = function(){
			return ts && !ts.enabled;
		};
		tl.push(scaleTask1);
		var scaleTask2:Task = new Task();
		scaleTask2.init = function(){
			ts = TweenScale.Begin(_go, _scaleTimeScale2 * _scaleTime,scale_ * _scale2);
			ts.method = _scaleMethod2;
		};
		scaleTask2.isOver = function(){
			return ts && !ts.enabled;
		};
		tl.push(scaleTask2);
		var scaleTask3:Task = new Task();
		scaleTask3.init = function(){
			ts = TweenScale.Begin(_go, _scaleTimeScale3 * _scaleTime, scale_ * _scale3);
			ts.method = _scaleMethod1;
		};
		scaleTask3.isOver = function(){
			return ts && !ts.enabled;
		};
		tl.push(scaleTask3);
		TaskManager.Run(tl);
		var tv:GeekTweenValue = GeekTweenValue.Begin(_number.gameObject, _valueTime, hit_, hit, this.gameObject, "setNumber");
		tv.method = _valueMethod;
		hit_ = hit;
	}
	
	public function setNumber(number:int){
		_number.text = Mathf.FloorToInt(number).ToString();
	}
	
	public function open(){
		open_ = true;
		_go.transform.localScale = scale_;
		TweenAlpha.Begin(this.gameObject, 0.001f, 1);
	}
	
	public function close(){
	
		var ta:TweenAlpha = null;
		var task:Task = new Task();
		task.init = function(){
			
			open_ = false;
			ta = TweenAlpha.Begin(this.gameObject, 0.3f, 0);
		};
		
		task.isOver = function(){
			if(ta && ta.enabled){
				return false;
			}
			return true;
		
		};
		task.shutdown = function(){
			hit_ = 0;
			setNumber(hit_);
		};
		TaskManager.Run(task);
		
		
	}
}

