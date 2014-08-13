#pragma strict
class EZUserTable extends MonoBehaviour{
	private static var instance_:EZUserTable = null;
	private  var tableName_:String = "game_user";
	private var data_:JsonData.UserData = null;
	private var isLogin_:boolean = false; 
	private var avatar_:String = "boy";
	private var userName_:String = "ez";
	public var _debug:boolean = false;
	public function get debug():boolean{
		return _debug;
	}
	public function doFirst(){
	
		this.data_ = null;
	}	
	public function get first(){
		Debug.Log("first" + data_);
		if(data_ == null || String.IsNullOrEmpty(data_.uuid)||String.IsNullOrEmpty(data_.hash)){
			return true;
		}
		return false;
	}	
	public function set avatar(value:String){
		avatar_ = value;
	}
	public function get avatar():String{
		return avatar_;
	}
	public function set userName(value:String){
		userName_ = value;
	}
	public function get userName():String{
		return userName_;
	}
	
	public function get data():JsonData.UserData{
		return data_;
	}
	function Awake(){
		this.instance_ = this;
		if(PlayerPrefs.HasKey(tableName_)){
			data_ = JsonData.UserData.Load(PlayerPrefs.GetString(tableName_));
		}else{
			data_ = new JsonData.UserData();
		}
		isLogin_ = false;
	}
	public function get isLogin():boolean{
		return isLogin_;
	}
	public function setup(uuid:String, hash:String){
		var data:JsonData.UserData = new JsonData.UserData(); 
		data.uuid = uuid;
		data.hash = hash;
		this.setup(data);
	}

	public function setup(data:JsonData.UserData){
		this.save(data);
		this.clear();
	}

	public function save(data:JsonData.UserData){
		data_ = data;
		var json:String = JsonData.UserData.Save(data_);
		PlayerPrefs.SetString(tableName_, json);
		PlayerPrefs.Save();
		isLogin_ = true;
	}
	
	public function release(){
		this.clear();
	}
	public function clear(){
		isLogin_ = false;
	}
	public function login():WebLoaderTask{
		var web:WebLoaderTask =  new WebLoaderTask("login", new JsonData.UserDataInfoLoader()); 
		web.pack.addField("uuid", this.data_.uuid);
		web.pack.addField("hash", this.data_.hash);
		TaskManager.PushBack(web, function(){
			var info:JsonData.UserDataInfo = web.data as JsonData.UserDataInfo; 
			if(info && info.succeed){
				info.user.print();
				WebForGame.GetInstance().data.setup(info.user.uuid, info.user.hash, info.user.sugar, "");
				this.save(info.user);
			}
		});
		return web;
	}
	
	
	public function check():WebLoaderTask{
		var web:WebLoaderTask =  new WebLoaderTask("check", new JsonData.CheckInfoLoader());   
		web.setup(WebForGame.GetInstance().data); 
		TaskManager.PushBack(web, function(){
			var info:JsonData.CheckInfo = web.data as JsonData.CheckInfo; 
			if(info && info.succeed){
			}else{ 
				 this.clear();
			}
		});
		return web;
	}
	public function register(weixinId:String):WebLoaderTask{
		
		var web:WebLoaderTask = new WebLoaderTask("register", new JsonData.UserDataInfoLoader()); 
		
		
		web.pack.addField("avatar", avatar_);
		web.pack.addField("name", userName_);
		web.pack.addField("weixin", weixinId);
		
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.UserDataInfo = web.data as JsonData.UserDataInfo; 
			if(info && info.succeed){
				info.user.print();
				WebForGame.GetInstance().data.setup(info.user.uuid, info.user.hash, info.user.sugar, "");
				this.save(info.user);
			}
		});
		return web;
	}
	public static function GetInstance():EZUserTable{
		return this.instance_;
	}
}