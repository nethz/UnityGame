#pragma strict

class AnimationSoilLight extends MonoBehaviour{
	public var _light1:exSprite = null;
	public var _light2:exSprite = null;
	public var _light3:exSprite = null;
	public var _light4:exSprite = null;
	public var _speed:float = 0.1f;
	
	private var tempSpeed_:float = _speed;
	
	
	public function Update(){
		
		var flag:float = _light1.scale.x;
		if(flag <= 0.9f){
			tempSpeed_ = _speed;
		}else if(flag >= 1.1f){
			tempSpeed_ = -_speed;
		}
		
		_light1.scale.x += Time.deltaTime*tempSpeed_*0.6f;
	
		_light2.scale.x -= Time.deltaTime*tempSpeed_*0.5f;
		
		_light3.scale.x += Time.deltaTime*tempSpeed_*0.6f;
	
		_light4.scale.x -= Time.deltaTime*tempSpeed_*0.5f;

	}
}