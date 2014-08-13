#pragma strict

class EZButtonPress extends MonoBehaviour{
	public var _actionDown:String;
	public var _actionUp:String;
	public var _target:GameObject;
	public var _tag:String = "Ctrl";
	public var _function:String = "OnAction";
	private function get target():GameObject{
		if(_target != null){
			return _target;
		}
		return GameObject.FindGameObjectWithTag(_tag);;
	}
	public function OnPress(isPressed:boolean){
		if(isPressed){
			target.SendMessage(_function, _actionDown, SendMessageOptions.DontRequireReceiver);
		}else{
			target.SendMessage(_function, _actionUp, SendMessageOptions.DontRequireReceiver);
		}
	}

}