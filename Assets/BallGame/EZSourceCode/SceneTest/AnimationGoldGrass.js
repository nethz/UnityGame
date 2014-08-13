#pragma strict

class AnimationGoldGrass extends MonoBehaviour{
	public var speed:float = 0.25f;
	public var degreen:float = 0.4f;
	
	private var skewX:float = 0f;
	private var temp:float = speed;
	
	public function Start(){
		
	}
	
	public function Update(){
		if(skewX < -degreen){
			temp = speed;
		}
		if(skewX > degreen){
			temp = -speed;
		}
		skewX += Time.deltaTime*temp;
		renderer.material.SetFloat( "_skewX", skewX);
	}
	
}