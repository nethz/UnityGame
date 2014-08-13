#pragma strict

class EZButtonObjCallback extends MonoBehaviour{
	private var callback_:Function = null;
	public function setup(callback:Function){
		callback_ = callback;
	}
	public function OnClick(){
		Debug.Log("onclick!!!");
		if(callback_){
			callback_(this.gameObject);
		}
	}
}