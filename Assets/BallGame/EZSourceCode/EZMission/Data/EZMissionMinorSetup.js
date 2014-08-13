#pragma strict

class EZMissionMinorSetup{
	
	private var face_:MissionCtrl.Face = MissionCtrl.Face.None;
	private var list_:List.<JsonData.Mission> = new List.<JsonData.Mission>();
	public function EZMissionMinorSetup(classify:String ,missions:List.<JsonData.Mission>, face:MissionCtrl.Face){
		face_ = face;
		if(face_ == MissionCtrl.Face.PveLevel){
			setup(missions, "pve", classify);
		}else if(face_ == MissionCtrl.Face.PveEliteLevel){
			setupElite(missions, "pve", classify);
		}
		
	}
	private function setup(missions:List.<JsonData.Mission>, mode:String, classify:String){
		for(var i:int = 0; i<missions.Count; ++i){
			if(missions[i].mode == mode && missions[i].classify == classify && !missions[i].big){//&& !missions[i].isElite
				list_.Add(missions[i]);
			}
		}
	}
	private function setupElite(missions:List.<JsonData.Mission>, mode:String, classify:String){
		for(var i:int = 0; i<missions.Count; ++i){
			if(missions[i].mode == mode && missions[i].classify == classify && missions[i].big){//&& missions[i].isElite
				list_.Add(missions[i]);
			}
		}
	}
	public function get list():List.<JsonData.Mission>{
		return list_;
	}
}