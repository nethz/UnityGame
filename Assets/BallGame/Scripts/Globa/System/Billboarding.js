#pragma strict
class Billboarding extends MonoBehaviour
{
	public var _camera:Camera = null;
	private var direction_:Quaternion = Quaternion();    
	function Start () {
		this.direction_ = Quaternion.FromToRotation (new Vector3 (0, 0, 1), Vector3.forward);
		if(_camera == null)
		{
			_camera = RPGCamera.CameraInstance();
		
		}
	}
	
	function Update () {
		this.transform.rotation = _camera.transform.rotation* direction_;  
	}
}