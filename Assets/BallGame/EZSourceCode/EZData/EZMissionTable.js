#pragma strict

class EZMissionTable extends MonoBehaviour{
	private var tableName_:String = "game_mission_";
	
	private var dict_:Dictionary.<int, JsonData.Mission> = new Dictionary.<int, JsonData.Mission>();
	
	
	public function setup(id:int){
		var mission:JsonData.Mission = JsonData.Mission.Load(PlayerPrefs.GetString(tableName_+id.ToString()));
		
		if(mission != null){
			dict_[id] = mission;
		}
	}
	
	public function get dict():Dictionary.<int, JsonData.Mission>{
		return dict_;
	}
	
	public function get list():List.<JsonData.Mission>{
		var ret:List.<JsonData.Mission> =  new List.<JsonData.Mission>();
		
		for(var kv:KeyValuePair.<int, JsonData.Mission> in dict_){
			var mission = kv.Value as JsonData.Mission; 
			ret.Add(mission);
		}
		return ret;
	}
	public function lastType():JsonData.Mission{
		var id:int = -1;
		var ret:JsonData.Mission = null;
		for(var kv:KeyValuePair.<int, JsonData.Mission> in dict_){
			var mission = kv.Value as JsonData.Mission; 
			if(mission.id > id){
				ret = mission;
				id = mission.id;
			}
		}
		return ret;
	}
	public function find(type:String):JsonData.Mission{
		for(var kv:KeyValuePair.<int, JsonData.Mission> in dict_){
			var mission = kv.Value as JsonData.Mission; 
			if(mission.type == type){
				return mission;
			}
		}
	}
	
	
	public function countNoBig():int{
		var count:int = 0;
		for(var kv:KeyValuePair.<int, JsonData.Mission> in dict_){
			var mission = kv.Value as JsonData.Mission; 
			if(mission.big == false){
				++count;
			}
		}
		return count;
	}
		public function countBig():int{
		var count:int = 0;
		for(var kv:KeyValuePair.<int, JsonData.Mission> in dict_){
			var mission = kv.Value as JsonData.Mission; 
			if(mission.big == true){
				++count;
			}
		}
		return count;
	}
	
	
	public function save(items:JsonData.MissionItem[], lists:JsonData.Mission[]){
		var dict = new Dictionary.<int, JsonData.Mission>();
		if(items != null){
			for(var i:int = 0; i< items.Length; ++i){
				for(var j:int = 0; j< lists.Length; ++j){
					if(lists[j].id == items[i].id && lists[j].ver == items[i].ver){
						
						dict[lists[j].id] = lists[j];
						var json:String = JsonData.Mission.Save(lists[j]);
						PlayerPrefs.SetString(tableName_ + lists[j].id.ToString(), json);
		
						PlayerPrefs.Save();
		
					}
				}
				if(!dict.ContainsKey(items[i].id) && dict_.ContainsKey(items[i].id)){
					dict[items[i].id] = dict_[items[i].id];
					
				}
				
			}
			dict_ = dict;
		}
	}
	
	
	public function addField(pack:WebPack, list:JsonData.MissionItem[]){
		
		var ids:Array = new Array();
		var vers:Array = new Array();
		for(var i:int = 0; i<list.Length; i++){
			if(dict_ != null && dict_.ContainsKey(list[i].id) && dict_[list[i].id].ver == list[i].ver){
			//	Debug.LogWarning("id:" + list[i].id + list[i].type);
				ids.push(list[i].id);
				vers.push(list[i].ver);
			}
				
		}
		
		if(ids.length != 0 && vers.length != 0){
			pack.addField("mission_ids", ids);
			pack.addField("mission_vers", vers);
		}
	}
	
}