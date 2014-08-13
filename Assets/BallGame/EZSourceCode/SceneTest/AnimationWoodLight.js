#pragma strict

class AnimationWoodLight extends MonoBehaviour{
	public var _light1:exSprite = null;
	public var _light2:exSprite = null;
	public var _speed:float = 0.1f;
	
	
	private var tempSpeed_:float = _speed;
	
	
	public function Update(){
		//this.gameObject.transform.position.x = _targetCamera.position.x + _distance;
		
		var flag:float = _light2.transform.rotation.z;
		if(flag <= -0.015f){
			tempSpeed_ = _speed;
		}else if(flag >= 0.015f){
			tempSpeed_ = -_speed;
		}
		
		_light1.shear.x += Time.deltaTime*tempSpeed_*0.3f;;
	
		_light2.transform.rotation.z += Time.deltaTime*tempSpeed_*0.09f;

	}
}