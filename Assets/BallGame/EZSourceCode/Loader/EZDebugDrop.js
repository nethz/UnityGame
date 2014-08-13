#pragma strict

class EZDebugDrop extends MonoBehaviour{
	public var _json:String = "";
	
	public function getData():JsonData.Soul{
		var soul:JsonData.Soul = JsonData.Soul.Load(_json);
		return soul;
	}	
}