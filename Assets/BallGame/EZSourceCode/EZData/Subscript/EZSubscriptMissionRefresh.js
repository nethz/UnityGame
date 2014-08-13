#pragma strict

class EZSubscriptMissionRefresh extends EZSubscriptRefresh{
	public var _talbe:EZMissionBagTable = null;
	public function getList():List.<String>{
	
		var list:List.<String> = new List.<String>(); 
	
		var bag:JsonData.MissionBag = _talbe.bag;
		if(bag && bag.list != null){
			for(var i:int = 0; i<bag.list.Length; ++i){
				list.Add("m" + bag.list[i].id.ToString());
			}
		}
	
		if(bag && bag.evtList != null){
			
			for(var j:int = 0; j<bag.evtList.Length; ++j){
				var id:int = bag.evtList[j].id;
				var evt:JsonData.EvtMission = _talbe.findEvtMissionFromId(id);
				
				if(evt == null || _talbe.isEnabled(evt)){
					list.Add("e" + id);
				}
				
			}
		}
		
		
		return list;
	}
}