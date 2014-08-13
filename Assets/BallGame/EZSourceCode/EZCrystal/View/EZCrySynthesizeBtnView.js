#pragma strict
class EZCrySynthesizeBtnView extends MonoBehaviour{
	public var _call:EZButtonCallback;
	
	public function Awake(){
		_call.setup(this.doCall, "");
	}
	
	public function Start(){
	
	}
	
	public function doCall(action:String){
		Debug.Log("doCall");
	}
}