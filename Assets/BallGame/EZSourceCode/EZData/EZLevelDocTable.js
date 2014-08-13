#pragma strict

class EZLevelDocTable extends MonoBehaviour{
	private var tableName_:String = "game_level_info_";
	private var curr_:JsonData.LevelDoc = null;
	private static var instance_:EZLevelDocTable = null;
	function Awake(){
		this.instance_ = this;
	}
	public function get curr():JsonData.LevelDoc{
		return curr_;
	}
	public function get isLoaded():boolean{
		return curr_ != null;
	}
	public static function GetInstance():EZLevelDocTable{
		return this.instance_;
	}

	public function save(type:String, doc:JsonData.LevelDoc){
		var data:String = JsonData.LevelDoc.Save(doc);
		PlayerPrefs.SetString(tableName_ + type, data);
		PlayerPrefs.Save();
	}
	public function clear(){
		curr_ = null;
	}
	public function loadTask(type:String, ver:int, reload:boolean):Task{
		
		var task:Task = new Task(); 
		
		curr_ = null;
		if((!reload) && (PlayerPrefs.HasKey(tableName_+type))){
			try{
				 Debug.Log(PlayerPrefs.GetString(tableName_+type));
				 curr_ = JsonData.LevelDoc.Load(PlayerPrefs.GetString(tableName_+type));
			}catch(e:System.Exception){
				curr_ = null;
			}
			if(curr_ != null){
				if(curr_.ver != ver){
					curr_ = null;
				}
			}
		} 
		
		
		
			
		if(curr_ != null){
			return new Task();
		}else{
			var web:WebLoaderTask =  new WebLoaderTask("level_doc", new JsonData.LevelDocInfoLoader());
			web.setup(WebForGame.GetInstance().data);
			web.pack.addField("type", type);
			web.pack.addField("ver", ver.ToString());
			
			TaskManager.PushBack(web, function(){
				var info:JsonData.LevelDocInfo = web.data as JsonData.LevelDocInfo;
				if(info &&info.succeed){
					this.save(type, info.doc);
					curr_ = info.doc;
					Debug.Log( JsonData.LevelDoc.Save(curr_));
				}
			});
			return web;
		}
		
	
	}
}