#pragma strict

class AnimationWoodLightOnly extends MonoBehaviour{
	public var _light:exSprite = null;
	public var _speed:float = 0.1f;
	
	private var tempSpeed_ = _speed;
	
	
	
	
	public function Update(){
		var flag:float = _light.scale.x;
		if(flag <= 1){
			tempSpeed_ = _speed;
		}else if(flag >= 1.8){
			tempSpeed_ = -_speed;
		}
				
		_light.scale.x += Time.deltaTime*tempSpeed_;
		_light.scale.y += Time.deltaTime*tempSpeed_;
	}
}