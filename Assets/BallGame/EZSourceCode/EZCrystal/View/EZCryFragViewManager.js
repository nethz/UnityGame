#pragma strict

class EZCryFragViewManager extends MonoBehaviour{
	public var _frags:EZCryFragView[];
	public function setMode(mode:EZCryNormalCtrl.Mode){
		for(var i:int = 0; i < frags.Length; ++i){
			frags[i].setMode(mode);
		}
	}
	
	public function get frags():EZCryFragView[]{
		return _frags;
	}
	
	public function open(){
		for(var i:int = 0; i < frags.Length; ++i){
			frags[i].open();
		}
	}
	
	public function close(){
		Debug.Log("close~~~~~");
		for(var i:int = 0; i < frags.Length; ++i){
			frags[i].close();
		}
	}
}