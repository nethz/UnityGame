#pragma strict
class test3 extends MonoBehaviour{
	public var json:String;
	function Start () {
		var info:JsonData.MissionBagInfo = JsonData.MissionBagInfo.Load(json);
		Debug.Log("a" + info.bag.list);
		Debug.Log("b" + info.bag.evtList);
	}


}