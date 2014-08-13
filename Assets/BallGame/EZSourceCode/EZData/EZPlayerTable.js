#pragma strict

class EZPlayerTable extends MonoBehaviour{
	private static var instance_:EZPlayerTable = null;
	private var player_:JsonData.Player = null;
	private static var tableName_:String = "game_player";
	private var isLoaded_:boolean = false;
	public function release(){
		isLoaded_ = false;
	}
	function get isLoaded():boolean{
		return isLoaded_;
	}
	function reset(){
	
		if(PlayerPrefs.HasKey(tableName_)){
			player_ = JsonData.Player.Load(PlayerPrefs.GetString(tableName_));
		}else{
			player_ = new JsonData.Player();
		}
		isLoaded_ = false;
	}
	function Awake(){
		this.instance_ = this;
		reset();
	}
	public static function GetInstance():EZPlayerTable{
		return this.instance_;
	}
	
	public function get data():JsonData.Player{
		
		return player_;
	}

	public function save(player:JsonData.Player){
		this.player_ = player;
		var data:String = JsonData.Player.Save(player_);
		PlayerPrefs.SetString(tableName_, data);
		PlayerPrefs.Save();
		isLoaded_ = true;
	}
	
	public function invitation():WebLoaderTask{
		var web:WebLoaderTask = new WebLoaderTask("invitation", new JsonData.InvitationInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		TaskManager.PushBack(web, function(){
			var info:JsonData.InvitationInfo = web.data as JsonData.InvitationInfo;
			if(info && info.succeed){
				this.save(info.player);
			}
		
		});
	
		return web;
	}
	
	public function invitationFail(invitation:JsonData.Invitation):WebLoaderTask{
		var web:WebLoaderTask = new WebLoaderTask("invitation_fail", new JsonData.InvitationInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		 
		web.pack.addField("code", invitation.code);
		web.pack.addField("from", invitation.from);
		TaskManager.PushBack(web, function(){
			var info:JsonData.InvitationInfo = web.data as JsonData.InvitationInfo;
			if(info && info.succeed){
				this.save(info.player);
			}
		
		});
	
		return web;
	}
	public function changeName(name:String){
		var web:WebLoaderTask = new WebLoaderTask("change_name", new JsonData.PlayerInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		
		web.pack.addField("name", EZTranscoding.Big5Gb2312(name));
		TaskManager.PushBack(web, function(){
			var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
			if(info && info.succeed){
				this.save(info.player);
			}
		
		});
	
		return web;
	}
	public function reload():WebLoaderTask{
	
		var web:WebLoaderTask = new WebLoaderTask("player", new JsonData.PlayerInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
			if(info && info.succeed){
				this.save(info.player);
			}
		
		});
	
		return web;
	}
	

	
	public function revive():WebLoaderTask{
		var web:WebLoaderTask = new WebLoaderTask("revive", new JsonData.PlayerInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
			if(info&& info.succeed){
				this.save(info.player);
			}		
		});
		
		return web;
	}
}