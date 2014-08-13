#pragma strict

class EZDialogueCursor extends MonoBehaviour{
	public var _distans:float = 1000f;
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _time:float = 0.5f;
	public var _sprite:UISprite;
	
	private var tp_:GeekTweenPosition = null;
	private var upPosition_:Vector3;
	private var downPosition_:Vector3;
	
	public function Start(){
		upPosition_ = this.gameObject.transform.localPosition + Vector3(0, _distans, 0);
		downPosition_ = this.gameObject.transform.localPosition + Vector3(0, -_distans, 0);
		tp_ = GeekTweenPosition.Begin(this.gameObject, _time, upPosition_);
		tp_.method = _method;
		tp_.style = GeekTweener.Style.PingPong;
	}
	
	public function show(){
		_sprite.enabled = true;
		goFloat();
	}
	
	public function hide(){
		_sprite.enabled = false;
		tp_.enabled = false;
	}
	
	public function stopFloat(){
		tp_.enabled = false;
		this.gameObject.transform.localPosition = downPosition_;
	}
	
	public function goFloat(){
		this.gameObject.transform.localPosition = downPosition_;
		tp_ = GeekTweenPosition.Begin(this.gameObject, _time, upPosition_);
		tp_.method = _method;
		tp_.style = GeekTweener.Style.PingPong;
	}
}