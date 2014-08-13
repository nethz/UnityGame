#pragma strict

class EZButton extends MonoBehaviour{
	public var _action:String;
	public var _target:GameObject;
	public var _tag:String = "Ctrl";
	public var _function:String = "OnAction";
	
	private function get target():GameObject{
		if(_target != null){
			return _target;
		}
		return GameObject.FindGameObjectWithTag(_tag);;
	}
	public function OnClick(){
		
		target.SendMessage(_function, _action, SendMessageOptions.DontRequireReceiver);
		
	}

}