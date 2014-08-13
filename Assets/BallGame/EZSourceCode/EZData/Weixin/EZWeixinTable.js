#pragma strict
class EZWeixinTable extends MonoBehaviour{
	private static var instance_:EZWeixinTable = null;
	//private  var tableName_:String = "game_weixin";
	private  var weixinId_:String = "";
	private var data_:JsonData.Weixin = null;
	private var crystal_:JsonData.WeixinCrystal = null;
	private var invitation_:JsonData.Invitation = null;
	public function get data():JsonData.Weixin{
		return data_;
	}
	//public function reset(){
		//if(PlayerPrefs.HasKey(tableName_)){
		//	data_ = JsonData.Weixin.Load(PlayerPrefs.GetString(tableName_));
		//}else{
		//	data_ = new JsonData.Weixin();
		//}
	//}
	function Awake(){
		this.instance_ = this;
		//reset();
	}
	public function save(data:JsonData.Weixin){
		this.data_ = data;
	}
	public function set weixinId(value:String){
		
		weixinId_ = value;
		//save(data);
	}
	public function get weixinId():String{
		return weixinId_;
	}
	public function load():Task{
		var web:WebLoaderTask = new WebLoaderTask("weixin", new JsonData.WeixinInfoLoader());
		web.pack.addField("weixin", weixinId_);
		TaskManager.PushBack(web, function(){
			var info:JsonData.WeixinInfo = web.data as JsonData.WeixinInfo;
			if(info && info.succeed){
				this.save(info.weixin);
			}
		});
		return web;
		
	}
	public function delay():Task{
		var tl:TaskList = new TaskList();
		if(crystal_ != null){
			tl.push(receiveCrystal(crystal_));
			crystal_ = null;
		}else if(invitation_ != null){
			tl.push(receiveInvitation(invitation_));
			invitation_ = null;
		}
		return tl;
	}
	public function receiveCrystal(crystal:JsonData.WeixinCrystal):Task{
	
		
		var table:EZUserTable = EZUserTable.GetInstance();
		if(table.isLogin){
			var web:WebLoaderTask =  new WebLoaderTask("magic_ball_receive", new JsonData.CheckInfoLoader());
			web.setup(WebForGame.GetInstance().data); 
			web.pack.addField("key", crystal.key);
			web.pack.addField("type", crystal.type.ToString());
			web.pack.addField("from", crystal.from);
			return web;
		}else{
			crystal_ = crystal;
			return new Task();
		}
		
		
	}
	public function receiveInvitation(invitation:JsonData.Invitation):WebLoaderTask{
	
		var table:EZUserTable = EZUserTable.GetInstance();
		 
		if(table.isLogin){
			var web:WebLoaderTask =  new WebLoaderTask("invitation_receive", new JsonData.CheckInfoLoader());
			web.setup(WebForGame.GetInstance().data); 
			web.pack.addField("code", invitation.code);
			web.pack.addField("from", invitation.from);
			return web;
		}else{
			invitation_ = invitation;
			return new Task();
		}
	}
	public function bindTask(user:JsonData.UserData):WebLoaderTask{
	
	
			var web:WebLoaderTask =  new WebLoaderTask("bind", new JsonData.BindInfoLoader());
			web.pack.addField("weixin", weixinId_);
			web.pack.addField("uuid", user.uuid);
			web.pack.addField("hash", user.hash);
			TaskManager.PushBack(web, function(){
				var info:JsonData.BindInfo = web.data as JsonData.BindInfo;
				if(info && info.succeed){
					this.save(info.weixin);
				}
			});
			return web;
		
	}
	public static function GetInstance():EZWeixinTable{
		return this.instance_;
	}
}