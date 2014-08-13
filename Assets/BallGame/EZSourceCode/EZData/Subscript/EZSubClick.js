#pragma strict

class EZSubClick extends MonoBehaviour{
	public var _sub:EZSub = null;
	public function OnPress(){
		_sub.doPress();
	}

}