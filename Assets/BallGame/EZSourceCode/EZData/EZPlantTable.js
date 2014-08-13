#pragma strict

class EZPlantTable extends MonoBehaviour{

	private static var instance_:EZPlantTable = null;
	private var data_:JsonData.Plant = null;
	private static var tableName_:String = "game_plant";
	private var isLoaded_:boolean = false;
	function get isLoaded():boolean{
		return isLoaded_;
	}
	function Awake(){
		this.instance_ = this;
		if(PlayerPrefs.HasKey(tableName_)){
			data_ = JsonData.Plant.Load(PlayerPrefs.GetString(tableName_));
		}else{
			data_ = new JsonData.Plant();
		}
		isLoaded_ = false;
	}
	
	public static function GetInstance():EZPlantTable{
		return this.instance_;
	}
	
	
	public function reload(id:int):Task{
		var web:WebLoaderTask =  new WebLoaderTask("plant", new JsonData.PlantInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.PlantInfo = web.data as JsonData.PlantInfo;
			if(info.succeed){
				EZPlayerTable.GetInstance().save(info.player);
				this.save(info.plant);
			}
		
		});
	
		return web;
	}
	public function save(data:JsonData.Plant){
		this.data_ = data;
		var json:String = JsonData.Plant.Save(data_);
		PlayerPrefs.SetString(tableName_, json);
		PlayerPrefs.Save();
		isLoaded_ = true;
	}
	
}