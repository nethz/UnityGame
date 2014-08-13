#pragma strict

class EZGuideCursor extends MonoBehaviour{
	public var _cursor:UISprite = null;
	public var _box:BoxCollider = null;
	public var _positionOffset:Vector3 = Vector3.zero;
	public var _timeOffset:float = 1f;
	public var _float:boolean = true;
	
	private var show_:boolean = false;
	private var tp_:TweenPosition = null;
	private var oldPosition_:Vector3 = Vector3.zero;
	
	public function Awake(){
		oldPosition_ = this.gameObject.transform.localPosition;
		this.hide();
	}
	
	function OnPress(isPressed:boolean){
		if(tp_){
			tp_.enabled = !isPressed;
		}
	}

	
	public function show(){
		show_ = true;
		refresh();
		if(_float) floating();
	}
	
	public function hide(){
		show_ = false;
		refresh();
	}
	
	private function refresh(){
		if(show_){
			_cursor.enabled = true;
			_box.enabled = true;
		}else{
			_cursor.enabled = false;
			if(tp_){
				tp_.enabled = false;
			}
			_box.enabled = false;
		}
	}
	
	private function floating(){
		this.gameObject.transform.localPosition = oldPosition_;
		tp_ = TweenPosition.Begin(this.gameObject,_timeOffset,oldPosition_ + _positionOffset);
		tp_.style = UITweener.Style.PingPong;
	}
	
	
}