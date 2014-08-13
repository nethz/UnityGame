
class EZBroadcastData extends MonoBehaviour{

	public var _json : String = "";
	private var list_:JsonData.BroadcastItem[] = null;
	
	private function init():boolean{
		if(list_ == null){
			list_ = JsonData.BroadcastItem.LoadList(_json);
		}
		if(list_ == null){
			return false;
		}
		return true;
	}
	public function get list():JsonData.BroadcastItem[]{
		if(this.init()){
			return this.list_;
		}
		return null;
	}
	public function getDataForScene(where:String):List.<JsonData.BroadcastData>{
		if(this.init()){
			var list:List.<JsonData.BroadcastData> = new List.<JsonData.BroadcastData>();
			
			for(var j:int = 0; j<list_.Length; ++j){
		//	Debug.LogWarning("wherewhere"+where);
		//	Debug.LogWarning("list_[j].sys"+list_[j].sys);
				if(list_[j].sys.ToLower() == where.ToLower()){
					if(inMission(list_[j])){
						var pets:List.<JsonData.BroadcastData> = getPets(list_[j]);
						
						if(pets != null){
							for(var m:int = 0; m<pets.Count; ++m){
								list.Add(pets[m]);
								
							}
							//list.push(list_[j]);
						}else{
							var item:JsonData.BroadcastData = aside(list_[j]);
							if(item != null){
								list.Add(item);
							}
						
						}
						//list.push(list_[j]);
					}
				}
			
			}
			
			return list;
		}
		return null;
	}
	
	public function inMission(item:JsonData.BroadcastItem):boolean{
		
		var missionBag:EZMissionBagTable = EZMissionBagTable.GetInstance();
		if(!String.IsNullOrEmpty(item.closeMission)){
			if(missionBag.find("ex_"+item.closeMission)!= null){
				return false;
			}
		}
		if(!String.IsNullOrEmpty(item.openMission)){
			if(missionBag.find("ex_"+item.openMission) == null){
				return false;
			}
		}
		return true;
	
	}
	public function aside(item:JsonData.BroadcastItem):JsonData.BroadcastData{
		
		return new JsonData.BroadcastData(item);
	
	}
	public function getPets(item:JsonData.BroadcastItem):List.<JsonData.BroadcastData>{
		
		if(item.openPets != null){
			var list:List.<JsonData.BroadcastData> = new List.<JsonData.BroadcastData>();
			for(var i:int = 0; i<item.openPets.Length; ++i ){
				var card:EZCard = EZBagTable.GetInstance().find("ex_" + item.openPets[i], 2);
				if(card != null){
					list.Add(new JsonData.BroadcastData(item, card.soul));
					
				}
			}
			return list;
		}
		return null;
	
	}
}