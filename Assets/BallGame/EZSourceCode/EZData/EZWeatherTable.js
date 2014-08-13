#pragma strict

class EZWeatherTable extends MonoBehaviour{
	private static var instance_:EZWeatherTable = null;
	private var data_:JsonData.Weather = null;
	private static var tableName_:String = "game_weather";
	private var isLoaded_:boolean = false;
	function get isLoaded():boolean{
		return isLoaded_;
	}
	function Awake(){
		this.instance_ = this;
		if(PlayerPrefs.HasKey(tableName_)){
			data_ = JsonData.Weather.Load(PlayerPrefs.GetString(tableName_));
		}else{
			data_ = new JsonData.Weather();
		}
		isLoaded_ = false;
	}
	public static function GetInstance():EZWeatherTable{
		return this.instance_;
	}
	
	public function get data():JsonData.Weather{
		return data_;
	}

	public function save(data:JsonData.Weather){
		this.data_ = data;
		var json:String = JsonData.Weather.Save(data_);
		PlayerPrefs.SetString(tableName_, json);
		PlayerPrefs.Save();
		isLoaded_ = true;
	}
	/*
	public function reload():Task{
		
	
		var web:WebLoaderTask =  new WebLoaderTask("weather", new JsonData.WeatherInfoLoader());
	//	var web:
	//	var task:WebWeatherTask =  WebTaskFactories.GetInstance().createTask(new WebWeatherTask()) as WebWeatherTask;
		web.setup(WebForGame.GetInstance().data);
		
	
		TaskManager.PushBack(web, function(){
			var info:JsonData.WeatherInfo = web.data as JsonData.WeatherInfo;
			if(info && info.succeed){
				this.save(info.weather);
			}
		//	this.save(task.data);
			
		});
		return web;
	}
	*/
	
}