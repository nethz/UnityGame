#pragma strict

class EZEvtMissionTable extends MonoBehaviour{
	private var tableName_:String = "game_evtmission_";
	
	private var dict_:Dictionary.<int, JsonData.EvtMission> = new Dictionary.<int, JsonData.EvtMission>();
	
	
	
	public function setup(id:int){
		var mission:JsonData.EvtMission = JsonData.EvtMission.Load(PlayerPrefs.GetString(tableName_+id.ToString()));
		
		if(mission != null){
			dict_[id] = mission;
		}
	}
	
	public function findFromId(id:int){
		for(var kv:KeyValuePair.<int, JsonData.EvtMission> in dict_){
			var mission = kv.Value as JsonData.EvtMission; 
			if(mission.id == id){
				return mission;
			}
		}
		return null;
		
	}
	public function isNotEnable(id:int):boolean{
		for(var kv:KeyValuePair.<int, JsonData.EvtMission> in dict_){
			var mission = kv.Value as JsonData.EvtMission; 
			if(mission.id == id){
				if(!isEnabled(mission)){
					return true;
				}
				return false;
			}
		}
		return false;
	}
		
	
	function isEnabled(data:JsonData.EvtMission):boolean{
		var time:System.DateTime = EZDateTime.GetDateTime(EZTimestamp.GetInstance().epoch); 
		if(data.howManyDays(time) != 0){
			return false;
		}
	
		var sTime:TimeSpan = EZDateTime.GetDateTime(data.start).TimeOfDay; 
		var nTime:TimeSpan = time.TimeOfDay; 
		var eTime:TimeSpan =  EZDateTime.GetDateTime(data.end).TimeOfDay;  
		var start:int =  sTime.Hours*60 + sTime.Minutes; 
		var now:int =  nTime.Hours*60 + nTime.Minutes;
		var end:int =  eTime.Hours*60 + eTime.Minutes;
		
		if(start == end){
			return true;
		}else if(now < start){
			 return false;
		}else if(now > end){
			 return false;
		}
		return true;
		
	}
	public function get list():List.<JsonData.EvtMission>{
		var ret:List.<JsonData.EvtMission> =  new List.<JsonData.EvtMission>();
		
		for(var kv:KeyValuePair.<int, JsonData.EvtMission> in dict_){
			var mission = kv.Value as JsonData.EvtMission; 
			ret.Add(mission);
		}
		return ret;
	}
	public function lastType():JsonData.EvtMission{
		var id:int = -1;
		var ret:JsonData.EvtMission = null;
		for(var kv:KeyValuePair.<int, JsonData.EvtMission> in dict_){
			var mission = kv.Value as JsonData.EvtMission; 
			if(mission.id > id){
				ret = mission;
				id = mission.id;
			}
		}
		return ret;
	}
	
	public function find(type:String):JsonData.EvtMission{
		for(var kv:KeyValuePair.<int, JsonData.EvtMission> in dict_){
			var mission = kv.Value as JsonData.EvtMission; 
			if(mission.type == type){
				return mission;
			}
		}
	
		return null;
	}
	public function save(items:JsonData.MissionItem[], events:JsonData.EvtMission[]){
		var dict = new Dictionary.<int, JsonData.EvtMission>();
		if(items != null){
			for(var i:int = 0; i< items.Length; ++i){
				for(var j:int = 0; j< events.Length; ++j){
					if(events[j].id == items[i].id && events[j].ver == items[i].ver){
						
						dict[events[j].id] = events[j];
						var json:String = JsonData.EvtMission.Save(events[j]);
						PlayerPrefs.SetString(tableName_ + events[j].id.ToString(), json);
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
	
	
	//public function save(id:int, mission:JsonData.EvtMission){
	//	var data:String = JsonData.EvtMission.Save(mission);
	//	PlayerPrefs.SetString(tableName_ + id.ToString(), data);
	//	PlayerPrefs.Save();
	//}/
	public function addField(pack:WebPack, list:JsonData.MissionItem[]){
		
		var ids:Array = new Array();
		var vers:Array = new Array();
		for(var i:int = 0; i<list.Length; i++){
			
			if(dict_ != null && dict_.ContainsKey(list[i].id) && dict_[list[i].id].ver == list[i].ver){
				ids.push(list[i].id);
				vers.push(list[i].ver);
			}
				
		}
		
		if(ids.length != 0 && vers.length != 0){
			pack.addField("mission_ids", ids);
			pack.addField("mission_vers", vers);
		}
	}
	/*
	public function loadTask(id:int, ver:int, reload:boolean):EZEvtMissionLoadTask{
		
		var task:EZEvtMissionLoadTask = new EZEvtMissionLoadTask(); 
		var isOver:boolean = false;
		
		
		if((!reload) && (PlayerPrefs.HasKey(tableName_+id.ToString()))){
			try{
				 task.data = JsonData.EvtMission.Load(PlayerPrefs.GetString(tableName_+id.ToString()));
			}catch(e:System.Exception){
				task.data = null;
			}
			if(task.data != null){
				if(task.data.ver != ver){
					task.data = null;
				}
			}
		} 
		
		
		
		if(task.data != null){
			isOver = true;
		}else{
			task.init = function(){
			
				var web:WebLoaderTask = new WebLoaderTask("evtmission", new JsonData.EvtMissionInfoLoader(), WebLoaderTask.Fault.AutoRetry);
				web.setup(WebForGame.GetInstance().data);
				web.pack.addField("id", id.ToString());
				
				TaskManager.PushBack(web, function(){
					var info:JsonData.EvtMissionInfo = web.data as JsonData.EvtMissionInfo;
					if(info &&info.succeed){
						this.save(id, info.mission);
						task.data = info.mission;
					}
					isOver = true;
				
				});
				
				
				TaskManager.Run(web);
			};
		
		}
		
		
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}*/
}