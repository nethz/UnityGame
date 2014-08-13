#pragma strict

class EZDebugSoul extends MonoBehaviour{
	public var _json:String;
	public function getData():JsonData.Boss{
		var soul:JsonData.Boss = new JsonData.Boss();
		soul.Load(_json);
		return soul;
	}

}
