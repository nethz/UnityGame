#pragma strict
class EZiPhone5BoxOffset extends EZScreen{
	public var _box:BoxCollider = null;
	public var _center:Vector2 = Vector2.zero;
	public var _size:Vector2 = Vector2.zero;
	public function Awake(){
		super.Awake();
		if(this._box){
			if(this.iPhone5){
				_box.center += _center;
				_box.size += _size;
			}
		}
	}
}