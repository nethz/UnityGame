#pragma strict

class EZMissionEvtMenuSetup{

	
	private var list_:List.<EZMissionEvtMenuData> = new List.<EZMissionEvtMenuData>();
	private var gold_:int = 0;
	private var silver_:int = 0;
	private var cuprum_:int = 0;
	private var goldMax_:int = 0;
	private var silverMax_:int = 0;
	private var cuprumMax_:int = 0;
	
	
	public function EZMissionEvtMenuSetup(missions:List.<JsonData.EvtMission>, gold:int, silver:int, cuprum:int){
		
		setup(missions);
		gold_ = gold;
		silver_ = silver;
		cuprum_= cuprum;
		
		var table:EZSetupTable = EZSetupTable.GetInstance();
		var data:JsonData.Setup = table.data;
		
		goldMax_ = data.game.gold_max;
		silverMax_ = data.game.silver_max;
		cuprumMax_ = data.game.cuprum_max;
		
		
	}

	public function get gold():int{
		return gold_;
	}
	public function get silver():int{
		return silver_;
	}
	public function get cuprum():int{
		return cuprum_;
	}
	
	
	public function get goldMax():int{
		return goldMax_;
	}
	public function get silverMax():int{
		return silverMax_;
	}
	public function get cuprumMax():int{
		return cuprumMax_;
	}
	
	public function addItem(mission:JsonData.EvtMission){
		for(var i:int = 0; i < list_.Count; ++i){
			var t:EZMissionEvtMenuData = list_[i];
			if(t.classify == mission.classify){
				t.addItem(mission);
				t.subList.Add("e" + mission.id.ToString());
				return;
			}
		}
		var temp:EZMissionEvtMenuData = new EZMissionEvtMenuData();
		temp.addItem(mission);
		temp.subList.Add("e" + mission.id.ToString());
		list_.Add(temp);
	}
	public function setup(missions:List.<JsonData.EvtMission>){
		for(var i:int =0; i< missions.Count; ++i){
			var time:System.DateTime = EZDateTime.GetDateTime(EZTimestamp.GetInstance().epoch);
			var text:String = "";
			for(var j:int = 0; j< missions[i].day.Length; ++j){
				text += missions[i].day[j] +",";
			
			}
			if(missions[i].day[time.DayOfWeek]){
				this.addItem(missions[i]);
			}
			
			
		}
		
		
	}
	public function get list():List.<EZMissionEvtMenuData>{
		return list_;
	}
}