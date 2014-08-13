#pragma strict
class EZLobbyName extends MonoBehaviour {
	
	public var _name:UILabel = null;
	public var _game:GameObject = null; 
	public var _size:float = 60.0f;
	public var _out:float = 60.0f;
	public function setup(name:String){
		_name.text = name;
		var size:Vector2 = _name.relativeSize;
		_game.transform.localScale.x = _size * size.x + _out;
	}
	
	
	
}