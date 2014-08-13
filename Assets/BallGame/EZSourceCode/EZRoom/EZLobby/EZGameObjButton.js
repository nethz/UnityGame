#pragma strict

class EZGameObjButton extends MonoBehaviour{
	private var target_:GameObject = null;
	public var _tag:String = "Ctrl";
	public var _function:String = "OnEvent";
	public var _object:GameObject = null;
	public function Awake(){
		if(target_ == null){
			target_ = GameObject.FindGameObjectWithTag(_tag);
		}
		
		if(_object == null){
			_object = this.gameObject;
		} 
	}
	public function OnClick(){
		if(target_){
			target_.SendMessage(_function, _object, SendMessageOptions.DontRequireReceiver);
		}
	}

}