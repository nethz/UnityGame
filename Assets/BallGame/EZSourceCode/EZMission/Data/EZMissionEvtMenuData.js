#pragma strict

class EZMissionEvtMenuData{

	private var subList_:List.<String> = new List.<String>();
	public function get subList():List.<String>{
		return subList_;
	}
	public function get classify():String{
		var mission:JsonData.EvtMission = this.getFirst();
		if(mission == null){
			return "";
		}
		return mission.classify;
	}
	public function get key():int{
		var mission:JsonData.EvtMission = this.getFirst();
		if(mission == null){
			return 0;
		}
		return mission.key;
	}
	
	public function get title():String{
		var mission:JsonData.EvtMission = this.getFirst();
		if(mission == null){
			return "";
		}
		return mission.classify;
		
	}
	
	
	public function get day():boolean[]{
		var mission:JsonData.EvtMission = this.getFirst();
		if(mission == null){
			Debug.LogWarning("warning");
			return null;
		}
		Debug.LogWarning("warning" + mission.day.Length);
		return mission.day;
		
	}
	
	public function get start():double{
	
		var mission:JsonData.EvtMission = this.getFirst();
		if(mission == null){
			return 0;
		}
		return mission.start;
		
	}
	
	
	public function get end():double{
	
		var mission:JsonData.EvtMission = this.getFirst();
		if(mission == null){
			return 0;
		}
		return mission.end;
		
	}
	public function getFirst():JsonData.EvtMission{
	
		if(list_ == null || list_.Count == 0){
			return null;
		}
		return list_[0];
		
	}
	private var list_:List.<JsonData.EvtMission> = null;
	public function get list():List.<JsonData.EvtMission>{
		return list_;
	}
	public function addItem(data:JsonData.EvtMission){
		if(list_ == null){
			list_ = new List.<JsonData.EvtMission>();
		}
		list_.Add(data);
	}
	
	
}