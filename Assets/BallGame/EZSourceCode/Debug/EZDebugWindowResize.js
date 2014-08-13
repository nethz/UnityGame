#pragma strict

class EZDebugWindowResize extends MonoBehaviour{
	private var width:float = 0;
	private var height:float = 0;
	
	public function Awake(){ 
		width = Screen.width;
		height = Screen.height;
		
	}
	
	public function Update(){
		 if(width != Screen.width || height != Screen.height){
		 	Debug.LogWarning("size Change!!!!!");
		 }
	
	}


}