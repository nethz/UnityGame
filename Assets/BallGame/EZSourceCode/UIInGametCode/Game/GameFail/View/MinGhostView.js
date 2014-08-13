#pragma strict

class MinGhostView extends MonoBehaviour{
	public var _ghost:UISprite;
	
	
	
	public function set ghost(value:String){
		_ghost.spriteName = value;
	}
}