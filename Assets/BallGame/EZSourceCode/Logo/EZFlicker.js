#pragma strict
class EZFlicker extends MonoBehaviour{
	public var _method:TweenAlpha.Method = TweenAlpha.Method.Linear;
	public var _time:float = 1.0f;
	public var _sprite:UISprite;
	public var _texture:UITexture;
	private var ta_:TweenAlpha = null;
	private var up_:boolean = true;
	public var _down:float = 0.2f;
	private var object_:GameObject = null;
	public function set isEnabled(value:boolean){
		this.enabled = value;
		if(_sprite){
			_sprite.enabled = value;
		}else if(_texture){
			_texture.enabled = value;
		}
	}
	public function Start(){
		if(_sprite){
			object_ = _sprite.gameObject;
			_sprite.alpha = 0.0f;
		}else if(_texture){
			object_ = _texture.gameObject;
			_texture.alpha = 0.0f;
		}
		ta_ = TweenAlpha.Begin(object_, _time, 1.0f);
		ta_.method = _method;
	}
	public function Update(){
		if(ta_ && !ta_.enabled){
			up_ = !up_;
			if(up_){
				ta_ = TweenAlpha.Begin(object_, _time, 1.0f);
			}
			else{
				ta_= TweenAlpha.Begin(object_, _time, _down);
			}
			ta_.method = _method;
		}
	}
}