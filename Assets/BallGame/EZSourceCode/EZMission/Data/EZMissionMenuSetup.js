#pragma strict

class EZMissionMenuSetup{
	class Temp{
		public var classify:String = "none";
		public var classifyInfo:String = "none";
		public var scene:String = "Fire";
		public var count:float = 0.0f;
		public var pass:float = 0.0f;
		public var list:List.<String> = new List.<String>();
	};
	private var list_:List.<EZMissionMenuData> = new List.<EZMissionMenuData>();
	private var eliteList_:List.<EZMissionMenuData> = new List.<EZMissionMenuData>();
	private var face_:MissionCtrl.Face = MissionCtrl.Face.None;
	private var tempList_:List.<EZMissionMenuSetup.Temp> = new List.<EZMissionMenuSetup.Temp>();
	
	public function EZMissionMenuSetup(missions:List.<JsonData.Mission>, face:MissionCtrl.Face){
		face_ = face;
		if(face_ == MissionCtrl.Face.Pve){
			setup(missions, "pve", false);
		}else if(face_ == MissionCtrl.Face.PveElite){
			setup(missions, "pve", true);
		}
	}
	
	public function addItem(mission:JsonData.Mission){
		for(var i:int = 0; i < tempList_.Count; ++i){
			var t:EZMissionMenuSetup.Temp = tempList_[i];
			if(t.classify == mission.classify){
				t.count += mission.getCount();
				t.pass += mission.getPass(); 
				t.list.Add("m" + mission.id.ToString());
				return;
			}
		}
		var temp:EZMissionMenuSetup.Temp = new EZMissionMenuSetup.Temp();
		temp.classify = mission.classify;
		temp.classifyInfo = mission.classify_info;
		temp.count = mission.getCount();
		temp.pass = mission.getPass();
		temp.scene = mission.scene;
		temp.list.Add("m" + mission.id.ToString());
		tempList_.Add(temp);
	}
	public function setup(missions:List.<JsonData.Mission>, mode:String, big:boolean){
		Debug.LogWarning(missions.Count);
		for(var i:int =0; i< missions.Count; ++i){
			if(missions[i].mode == mode && missions[i].big == big){
				this.addItem(missions[i]);
			}
		}
		
		for(var j:int = 0; j<tempList_.Count; ++j){
			var data:EZMissionMenuData = new EZMissionMenuData();
			data.title = tempList_[j].classify;
			data.scene = tempList_[j].scene;
			data.info = tempList_[j].classifyInfo; 
			data.list = tempList_[j].list;
			if(tempList_[j].count<=0){
				data.collect = 1;
			}else{
				data.collect = tempList_[j].pass/tempList_[j].count;
			}
			list_.Add(data);
			eliteList_.Add(data);
		}
		
	}
	public function get list():List.<EZMissionMenuData>{
		return list_;
	}
	public function get eliteList():List.<EZMissionMenuData>{
		return eliteList_;
	}
}