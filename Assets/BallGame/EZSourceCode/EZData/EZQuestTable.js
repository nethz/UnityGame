#pragma strict

class EZQuestTable extends MonoBehaviour{
	private var tableName_:String = "game_quest_";
	
	private var dict_:Dictionary.<int, JsonData.Quest> = new Dictionary.<int, JsonData.Quest>();
	public function get list():List.<JsonData.Quest>{
	
		var ret:List.<JsonData.Quest> =  new List.<JsonData.Quest>();
		for(var kv:KeyValuePair.<int, JsonData.Quest> in dict_){
			var quest = kv.Value as JsonData.Quest; 
			ret.Add(quest);
		}
		return ret;
	}
	public function setup(id:int){
		var quest:JsonData.Quest = JsonData.Quest.Load(PlayerPrefs.GetString(tableName_+id.ToString()));
//		Debug.LogWarning("id" + id);
		if(quest != null){
//			Debug.LogWarning("quest:" + quest);
			dict_[id] = quest;
		}
	}
	public function save(item:JsonData.QuestId[], quests:JsonData.Quest[]){
	
		var dict = new Dictionary.<int, JsonData.Quest>();
		if(item != null){
			for(var i:int = 0; i< item.Length; ++i){
				for(var j:int = 0; j< quests.Length; ++j){
					if(quests[j].id == item[i].id && quests[j].ver == item[i].ver){
						
						dict[quests[j].id] = quests[j];
						var json:String = JsonData.Quest.Save(quests[j]);
		
		
						PlayerPrefs.SetString(tableName_ + quests[j].id.ToString(), json);
						PlayerPrefs.Save();
		
					}
				}
				if(!dict.ContainsKey(item[i].id) && dict_.ContainsKey(item[i].id)){
					dict[item[i].id] = dict_[item[i].id];
					
				}
				
			}
			dict_ = dict;
		
		}
	}
	//public function save(id:int, quest:JsonData.Quest){
	//	var data:String = JsonData.Quest.Save(quest);
	//	PlayerPrefs.SetString(tableName_ + id.ToString(), data);
	//	PlayerPrefs.Save();
	//}
	public function addField(pack:WebPack, quests:JsonData.QuestId[]){
		var ids:Array = new Array();
		var vers:Array = new Array();
		for(var i:int = 0; i<quests.Length; i++){
			if(dict_ != null && dict_.ContainsKey(quests[i].id) && dict_[quests[i].id].ver == quests[i].ver){
				
				ids.push(quests[i].id);
				vers.push(quests[i].ver);
			}
				
		}
		if(ids.length != 0 && vers.length != 0){
			pack.addField("quest_ids", ids);
			pack.addField("quest_vers", vers);
		}
		
	
	}
/*
	public function loadTask(id:int, ver:int,  reload:boolean):EZQuestLoadTask{
		
		var task:EZQuestLoadTask = new EZQuestLoadTask(); 
		var isOver:boolean = false;
	
	
	
		
		if((!reload) && (PlayerPrefs.HasKey(tableName_+id.ToString()))){
			try{
				 task.data = JsonData.Quest.Load(PlayerPrefs.GetString(tableName_+id.ToString()));
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
				var web:WebLoaderTask =  new WebLoaderTask("quest", new JsonData.QuestInfoLoader(), WebLoaderTask.Fault.AutoRetry);
				web.setup(WebForGame.GetInstance().data);
				web.pack.addField("id", id.ToString());
				TaskManager.PushBack(web, function(){
					var info:JsonData.QuestInfo = web.data;
					if(info && info.succeed){
						this.save(id, info.quest);
						task.data = info.quest;
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