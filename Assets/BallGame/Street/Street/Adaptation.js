#pragma strict
class Adaptation  extends MonoBehaviour
{
	public var _camera:Camera = null;
	public var _cameraGetter:CameraGetter;
	
	function getRect():Rect
	{
		return Rect(0,0,0,0);
	}
	
	function getCamera():Camera{
		if(_camera == null){
			if(_cameraGetter != null){
				_camera = _cameraGetter.getCamera();
			}
		}
		return this._camera;
	}
}
