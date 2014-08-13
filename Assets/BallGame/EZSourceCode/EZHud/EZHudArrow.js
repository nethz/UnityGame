#pragma strict


class EZHudArrow extends MonoBehaviour{
	public var _arrow:GameObject = null;
	public var _distans:float = 1000f;
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _time:float = 0.5f;
	public var _sprite:UISprite;
	
	private var tp_:GeekTweenPosition = null;
	private var up_:boolean = true;
	private var upPosition_:Vector3;
	private var downPosition_:Vector3;
	public function set isEnabled(value:boolean){
		this.enabled = value;
		_sprite.enabled = value;
	}
	public function Start(){
		upPosition_ = this.gameObject.transform.localPosition + Vector3(0, _distans, 0);
		downPosition_ = this.gameObject.transform.localPosition + Vector3(0, -_distans, 0);
		tp_ = GeekTweenPosition.Begin(this.gameObject, _time, upPosition_);
		tp_.method = _method;
		this.isEnabled = false;
	}
	public function Update(){
		if(tp_ && !tp_.enabled){
			up_ = !up_;
			if(up_){
				tp_ = GeekTweenPosition.Begin(this.gameObject, _time, upPosition_);
			}
			else{
				tp_ = GeekTweenPosition.Begin(this.gameObject, _time, downPosition_);
			}
			tp_.method = _method;
		}
	}
	
}