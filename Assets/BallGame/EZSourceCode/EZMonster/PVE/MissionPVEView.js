#pragma strict

class MissionPVEView extends MonoBehaviour{
	public var _main:MissionMainView = null;
	public var _eliteMain:MissionMainView = null;
	public var _minor:MissionMinorView = null;
	
	public function get main():MissionMainView{
		return _main;
	}
	
	public function get eliteMain():MissionMainView{
		return _eliteMain;
	}
	
	public function get minor():MissionMinorView{
		return _minor;
	}
	
}