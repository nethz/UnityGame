#pragma strict

class RPGCameraGetter extends CameraGetter{
	function getCamera():Camera{
		return RPGCamera.CameraInstance();
	}
}