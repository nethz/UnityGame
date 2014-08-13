#pragma strict

class MissionView extends MonoBehaviour{
	public var _pve:MissionPVEView = null;
	public var _event:MissionTabView = null;
	//public var _pvp:MissionTabView = null;
	
	public function get pve():MissionPVEView{
		return _pve;
	}
	
	public function get event():MissionTabView{
		return _event;
	}
	
	/*public function get pvp(){
		return _pvp;
	}*/
}