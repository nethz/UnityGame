#pragma strict

class EZLayerClick extends MonoBehaviour{
	public var _target:GameObject; 

	public function OnClick(){
		_target.gameObject.SendMessage("OnClick", SendMessageOptions.DontRequireReceiver);
	}	

}