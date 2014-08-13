#pragma strict

class AnimationCloud extends MonoBehaviour{
	public var _cloud:exSprite = null;
	//public var _cloudSpeed:float = 0.02f;
	public var _cloudSpeed:Vector2;
	private var offset_:Vector2;
	
	public function Update(){
		offset_ += Time.deltaTime * _cloudSpeed;
		while(offset_.x > 1.0f){
			offset_.x -= 1.0f;
		}
		while(offset_.y > 1.0f){
			offset_.y -= 1.0f;
		}
		_cloud.renderer.material.SetTextureOffset ("_MainTex", offset_);
	}

}