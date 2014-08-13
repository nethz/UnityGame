#pragma strict

class EZCardViewSelected extends MonoBehaviour{
	public var _card:EZCardView = null;
	public var _action:String = "addCard";
	public var _target:GameObject = null;

	
	private function get target():GameObject{
		if(_target != null){
			return _target;
		}
		return GameObject.FindGameObjectWithTag("Ctrl");
	}
	function OnClick(){
		target.SendMessage(_action, _card.data, SendMessageOptions.DontRequireReceiver);
	}
}