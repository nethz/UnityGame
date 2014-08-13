#pragma strict

class EZShadowCamera extends MonoBehaviour{
	public var _box:BoxCollider;
	public var _external:float = 0;
	public function Awake(){
		Debug.Log(_box);
		Debug.Log(_box.size);
		Debug.Log(_box.center);
		var size:float = _box.size.y > _box.size.x? _box.size.y:_box.size.x;
		var y:float = size/2;
		this.camera.orthographicSize = y + _external; 
		this.transform.localPosition = this._box.center;
	}

}