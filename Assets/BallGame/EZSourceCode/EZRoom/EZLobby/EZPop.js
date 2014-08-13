#pragma strict

class EZPop extends MonoBehaviour{
	public var _text:UILabel = null;
	public var _bg:UISprite = null;
	public var _panel:UIPanel = null;
	public var _showTime:float = 0.5f; 
	public var _hideTime:float = 0.4f; 
	public var _inMethod  = GeekTweener.Method.easeOutElastic;
	public var _outMethod  = GeekTweener.Method.linear;
	private var reset_:Function = null;
	private var _isShow:boolean = false;
	private var _oldScale = Vector3.one;
	public function Awake(){ 
		_oldScale = this.gameObject.transform.localScale;
		if(_panel == null){
			_panel = this.gameObject.GetComponent.<UIPanel>();
		}
	}
	public function setTurns(turn:boolean){
		
	
	}

	public function Start(){
		this.close();
		
	}
	public function hideTask():Task{
		var task:Task = new Task();
		
		var ts:GeekTweenScale = null;
		var ta:GeekTweenValue = null;
		task.init = function(){
			if(reset_!=null){
				reset_();
				reset_ = null;
			}
			if(_isShow){
				ts = GeekTweenScale.Begin(this.gameObject, _hideTime, new Vector3(2 * _oldScale.x,2 * _oldScale.y,1 * _oldScale.z));
				ta = GeekTweenValue.Begin(this.gameObject, _hideTime - 0.2f, 1.0f, 0.0f, this.gameObject, "setAlpha"); 
				ts.method  = _outMethod;
			}
			//show();
			
			reset_ = function(){
				if(ts){
					ts.enabled = false;
				}
				if(ta){
					ta.enabled = false;
				}
				hide();
			};
			
		};
		task.shutdown = function(){
			if(reset_ != null){
				reset_();
				reset_ = null;
			}
		};
		task.isOver = function():boolean{
			if(ts && ts.enabled){
				return false;
			}
			
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return task;
	
	} 
	
	public function show(){
		_panel.alpha = 1;
		_text.enabled = true;
		_bg.enabled = true;
		_isShow = true;
	}
	public function hide(){
		_isShow = false;
		_panel.alpha = 0;
		_text.enabled = false;
		_bg.enabled = false;
	}
	public function set alpha(value:float){
		_text.alpha = value;
		_bg.alpha = value;
	}
	public function setAlpha(alpha:float){
		this.alpha = alpha;
	}
	
	public function setPosition(camera:Camera, gameObject:GameObject, offset:Vector3, autoTurn:boolean){}
	
	public function showTask(text:String):Task{
		var task:Task = new Task();
		var ts:GeekTweenScale = null;
		task.init = function(){
			if(reset_!=null){
				reset_();
				reset_ = null;
			}
			
			this.transform.localScale = Vector3(0.0001f* _oldScale.x, 0.0001f* _oldScale.y, 1.0f* _oldScale.z);
			ts = GeekTweenScale.Begin(this.gameObject, _showTime, new Vector3(1* _oldScale.y,1* _oldScale.x,1* _oldScale.z)); 
			ts.method = _inMethod;
			_text.text = text;
			show();
			this.alpha = 1;
			reset_ = function(){
				if(ts){
					ts.enabled = false;
				}
			};
		};
		task.shutdown = function(){
			if(reset_!=null){
				reset_();
				reset_ = null;
			}
		};
		task.isOver = function():boolean{
			if(ts && ts.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	public function close(){
		if(reset_!=null){
			reset_();
			reset_ = null;
		}
		hide();
	}
	

}