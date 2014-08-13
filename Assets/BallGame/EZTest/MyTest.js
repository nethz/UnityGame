#pragma strict

class MyTest extends MonoBehaviour{
	public var _sk:EZSkeletal; 
	public var _color:Color;
	
	public function Update(){
		
		_sk.color = _color;
	}
}