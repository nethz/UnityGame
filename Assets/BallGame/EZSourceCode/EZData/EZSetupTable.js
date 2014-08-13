#pragma strict

class EZSetupTable extends MonoBehaviour{
	private var setup_:JsonData.Setup = null;
	
	private static var instance_:EZSetupTable = null;
	private static var tableName_:String = "game_setup";
	private var isLoaded_:boolean = false;
	public function release(){
		isLoaded_ = false;
	}
	public function get data():JsonData.Setup{
		return setup_;
	}
	public function get isLoaded():boolean{
		return isLoaded_;
	}
	public static function GetInstance():EZSetupTable{
		return this.instance_;
	}
	
	public function reset(){
		if(PlayerPrefs.HasKey(tableName_)){
			setup_ = JsonData.Setup.Load(PlayerPrefs.GetString(tableName_));
		}else{
			setup_ = new JsonData.Setup();
		}
		isLoaded_ = false;
	}
	public function Awake(){
	
		this.instance_ = this;
		reset();
	}
	
	public function save(setup:JsonData.Setup){
		Debug.Log(setup);
		setup_ = setup;
		var data:String = JsonData.Setup.Save(setup_);
		if(setup_.server){
			Debug.LogWarning(setup_.server.release);
			Debug.LogWarning(setup_.server.debug);
			//WebTaskFactories.GetInstance().info.releaseServer = setup_.server.release;
			//WebTaskFactories.GetInstance().info.debugServer = setup_.server.debug;
		
		}
		PlayerPrefs.SetString(tableName_, data);
		PlayerPrefs.Save();
		isLoaded_ = true;
		
	}
//#if UNITY_EDITOR
	public function load():WebLoaderTask{
		var web:WebLoaderTask =  new WebLoaderTask("setup", new JsonData.SetupInfoLoader(), WebInfo.Server.Master);
		web.setup(WebForGame.GetInstance().data);
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.SetupInfo = web.data as JsonData.SetupInfo;
			if(info && info.succeed){
				this.save(info.setup);
			}
		});
		return web;
	
	}
//#endif
	
}