#pragma strict

class CameraTaskFactory extends MonoBehaviour
{
	
	public var _name:String = "";
	protected var camera_:Camera;
	protected var target_:Transform;
	protected var cameraPosition_:Vector3; 
	protected var orthographicSize_:float;
	public function setCamera(value:Camera){
		this.camera_ = value;
		orthographicSize_  = this.camera_.orthographicSize; 
		cameraPosition_ = camera_.transform.position;
	}
	
	public function setTarget(value:Transform){
		this.target_ = value;
	}

	
	public function getName():String{
		return _name;
	}
	public function create():Task{
		return null;
	}
}