#pragma strict

class AnimationGoldPoint extends MonoBehaviour{
	public var speed:float = 50f;
	public function Start(){
		
	}
	
	public function Update(){
		this.transform.Rotate(Vector3.back*Time.deltaTime*speed);
	}
	
}