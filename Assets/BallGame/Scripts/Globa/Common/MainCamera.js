#pragma strict
class MainCamera extends MonoBehaviour
{

	private static var instance_:MainCamera = null;
	
	public function MainCamera(){
		
		instance_ = this;
	
	}
/*
	public static function getIt():Camera{
		if(instance_ == null){
			return Camera.mainCamera;
		}else{
			return instance_.camera;
		}
	
	}
*/
}



