#pragma strict

class EZSpeciallyOffset extends MonoBehaviour{
	public var _offset:Vector3;
	public function get position():Vector3{
		return _offset;
	}
}