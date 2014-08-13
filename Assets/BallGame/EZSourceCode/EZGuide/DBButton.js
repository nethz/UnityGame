#pragma strict

class DBButton extends MonoBehaviour{
	public var _target:GameObject = null;
	public var _function:String = "";


	public function OnClick(){
		Debug.Log(this.name);
		if(_target){
			_target.SendMessage(_function, SendMessageOptions.DontRequireReceiver);
		}
	}
}