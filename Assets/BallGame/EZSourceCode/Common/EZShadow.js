#pragma strict


class EZShadow extends MonoBehaviour{
	public var _sprite:exSprite;
	private var size_:Vector2;
	private var offset_:Vector2;
	private var skew_:Vector2;
	public function Awake(){
	
	}
	public function get sprite():exSprite{
		return _sprite;
	}
	public function set size(value:Vector2){
		size_ = value;
		_sprite.width = size_.x;
		_sprite.height = size_.y;
	}
	
	public function set offset(value:Vector2){
		offset_ = value;
		this.renderer.material.SetFloat("_offsetX",offset_.x);
		this.renderer.material.SetFloat("_offsetY",offset_.y);
	}
	public function get offset():Vector2{
		return offset_;
	}
	
	
	public function set skew(value:Vector2){
		skew_ = value;
		this.renderer.material.SetFloat("_skewX",skew_.x);
		this.renderer.material.SetFloat("_skewY",skew_.y);
	}
	public function get skew():Vector2{
		return skew_;
	}
		
	
	
}