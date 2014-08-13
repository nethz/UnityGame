#pragma strict

class SendToCheckBox extends MonoBehaviour{
	public var _target:GameObject = null;
	public var _funName:String = "OnAction";
	
	public function Awake(){
		if(_target == null){
			_target = this.gameObject.transform.parent.gameObject;
		}
	}
	public function OnClick(){
		Debug.Log(this.name);
		if(_target){
			_target.SendMessage(_funName, SendMessageOptions.DontRequireReceiver);
		}
	}
}