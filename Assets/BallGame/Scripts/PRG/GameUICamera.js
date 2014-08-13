#pragma strict

class GameUICamera extends MonoBehaviour
{

	private static var instance_:GameUICamera = null;
	
	public function Awake(){
		instance_ = this;
	}
	
	public static function  instance():Camera{
		if(instance_ == null){
			return Camera.mainCamera;
		}else{
			return instance_.camera;
		}
	
	}


}