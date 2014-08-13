#pragma strict

class PuzzleCamera extends MonoBehaviour{

	private static var instance_:PuzzleCamera = null;
	
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