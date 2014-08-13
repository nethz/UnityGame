#pragma strict
class EZLobbyCrystalBase extends MonoBehaviour{
	public var _ball:GameObject = null;
	
	public var _coverLight:UISprite = null;
	public var _startAlpha:float = 0.0f;
	public var _endAlpha:float = 0.5f;
	public var _alphaTime:float = 0.3f;
	public var _alphaMethod:UITweener.Method = UITweener.Method.Linear;
	
	public var _base:UITexture = null;
	public var _base2:UITexture = null;
	
	public var _distans:float = 1000f;
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _time:float = 0.5f;
	public var _big:float = 1.1f;
	private var tp_:GeekTweenPosition = null;
	private var up_:boolean = true;
	private var upPosition_:Vector3;
	private var downPosition_:Vector3;
	private var last_:float = 0;
	private var scale_:Vector3 = Vector3.one;
	private var isOpen_:boolean = false;
	private var data_:JsonData.Crystal = null;
	
	public var _box:BoxCollider = null;
	
	
	
	public function setup(data:JsonData.Crystal){
		data_ = data;
		if(data_){
			this.open();
		}else{
			this.close();
		}
	}
	
	public function open(){
		isOpen_ = true;
		refresh();
	}
	public function close(){
		isOpen_ = false;
		refresh();
	}
	public function refresh(){
		if(isOpen_){
			_base.enabled = true;
			_box.enabled = true;
			_base2.enabled = true;
		}else{
			_base.enabled = false;
			_box.enabled = false;
			_base2.enabled = false;
		}
	}

	public function Start(){
		upPosition_ = _ball.gameObject.transform.localPosition + Vector3(0, _distans, 0);
		downPosition_ = _ball.gameObject.transform.localPosition + Vector3(0, -_distans, 0);
		tp_ = GeekTweenPosition.Begin(_ball.gameObject, _time, upPosition_);
		tp_.method = _method;
		scale_ = _ball.transform.localScale;
		_coverLight.color.a = _startAlpha;
	}
	
	public function Update(){
		if(tp_ && !tp_.enabled){
			up_ = !up_;
			if(up_){
				tp_ = GeekTweenPosition.Begin(_ball.gameObject, _time, upPosition_);
			}
			else{
				tp_ = GeekTweenPosition.Begin(_ball.gameObject, _time, downPosition_);
			}
			tp_.method = _method;
		}
	}
	
	public function OnPress(state:boolean){
		var ta:TweenAlpha = null;
		if(state){
			if(tp_){
				last_ = (1.0f-tp_.tweenFactor) * _time;
				tp_.enabled = false;
			}
			tp_ = null;
			
			ta = TweenAlpha.Begin(_coverLight.gameObject, _alphaTime, _endAlpha);
			ta.method  = _alphaMethod;
		}else{
			if(up_){
				tp_ = GeekTweenPosition.Begin(_ball.gameObject, last_ , upPosition_);
			}
			else{
				tp_ = GeekTweenPosition.Begin(_ball.gameObject, last_, downPosition_);
			}
			tp_.method = _method;
			ta = TweenAlpha.Begin(_coverLight.gameObject, _alphaTime, _startAlpha);
			ta.method  = _alphaMethod;
		}
	}
}