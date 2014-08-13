#pragma strict

class RPGCamera extends MonoBehaviour
{

	private static var instance_:RPGCamera = null;
	
	public function Awake(){
		instance_ = this;
	}
	
	public static function  CameraInstance():Camera{
		return instance_.camera;
	}


}