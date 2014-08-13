#pragma strict

class CameraPerspective extends MonoBehaviour{

	public var _camera:Camera;
	public var _target:Transform;
	private var _beginZ:float;
	private var _z:float = 0;
	private var begin_:float = 0;
	public var _end:float = 0;
	public function Awake(){
		begin_ = _camera.orthographicSize;
		_beginZ = _camera.transform.position.z;
		_z = _beginZ;
	}
	public function LateUpdate(){
		if(_z != _camera.transform.position.z){
		
			_z = _camera.transform.position.z;
			var r:float = (_camera.transform.position.z - _target.position.z)/(_beginZ - _target.position.z);
			_camera.orthographicSize = begin_ *(r) + _end*(1-r);
		}
	}

}