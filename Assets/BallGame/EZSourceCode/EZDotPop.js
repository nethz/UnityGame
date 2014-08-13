#pragma strict

class EZDotPop extends MonoBehaviour{
	public var sprite_:UISprite;
	public function Awake(){
		hide();
	}
	public function show(){
		sprite_.enabled = true;
	}
	public function hide(){
		sprite_.enabled = false;
	}
}