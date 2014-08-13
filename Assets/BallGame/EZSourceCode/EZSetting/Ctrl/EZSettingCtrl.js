#pragma strict

class EZSettingCtrl extends MonoBehaviour{
	public var _main:SettingMainCtrl = null;
	public var _idCtrl:EZChangeIDWindow = null;
	public var _invitation:EZSettingInvitation = null;
	public var _whiteSpace:String = "whiteSpace";
	private var changeName_:String = "";
	public var _invitationText:String = "";
	public var _fail:String = "fail";
	public var _title:String = "title";
	public var _description:String = "description";
	public var _url:String = "http://gdgeek.com";
	public var _image:String = "invitation.png";
	public var _weixinInfo:EZWeixinInfo = null;
	
	public var _webText:String = "texr";
	public var _webOk:String = "ok";
	public var _webCancel:String = "cancel";
	public var _mark:EZUISwitch = null;
	public function weixinWeb():Task{
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
	
		window.text = _webText;	
		window.ok = _webOk;
		window.cancel = _webCancel;
		TaskManager.PushBack(window, function(){
			if(window.okOrCancel){
				GeekWeixin.GoUrl(WebForGame.GetInstance().info.getUrl("wechatInfo", WebInfo.Server.Master));
			}
		});
		
		return window;
	}
	public function get mark():EZUISwitch{
		return _mark;
	}
	public function get weixinInfo():EZWeixinInfo{
		return _weixinInfo;
	}
	public function get main():SettingMainCtrl{
		return _main;
	}
	public function get changeName():String{
		return changeName_;
	}
	public function set changeName(value:String){
		changeName_ = value;
	}
	public function get invitation():EZSettingInvitation{
		return _invitation;
	}
	public function get idView():EZChangeIDWindow{
		return _idCtrl;
	}
	/*public function weixinFailTask(){
		var tl:TaskList = new TaskList(); 
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3f;
		loading.alpha = 0.5f;
		loading.text = EZDictionary.LookUp("!loading");
		 
		tl.push(loading);
		tl.push(this.fail()); 
		
		var table:EZPlayerTable = EZPlayerTable.GetInstance();
		tl.push(table.invitationFail()); 
		 
		 
		 
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		tl.push(loaded);
		
		
		TaskManager.PushBack(tl, function(){
			this.setup();
		});
	
		return tl;
	}; */
	public function whiteSpace():Task{
	
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_whiteSpace);
		return warning;
	}
	public function invitationTask():Task{
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _invitationText;				
		window.ok = EZDictionary.LookUp("!ok");
		window.cancel = EZDictionary.LookUp("!cancel");
		return window;
	}
	public function setup(){
		var data:JsonData.SoundSetup = EZSoundManager.GetInstance().setup;
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		_invitation.setup(player.data.invitation);
		_main.view.sound.setup(data);
	}
	
	public function s2wImpl(wt:EZWeixinInvitationTask):Task{
		var task:Task = new Task();
		
		var isOver:boolean = false;
		task.isOver = function():boolean{
			return isOver;
		};
		
		task.init = function(){
			var table:EZPlayerTable = EZPlayerTable.GetInstance();
			var web:WebLoaderTask = table.invitation();
			TaskManager.PushBack(web, function(){
				var info:JsonData.InvitationInfo = web.data as JsonData.InvitationInfo;
				if(info && info.succeed){   
					setup();
					var wx:EZWeixin.SendTask = weixin(info.invitation);
					TaskManager.PushBack(wx, function(){
						 wt.result = wx.result;
						 wt.invitation = info.invitation;
						 isOver = true; 
						 
					}); 
					TaskManager.Run(wx);
				}else{  
					var fail:Task = fail();
					TaskManager.PushBack(fail, function(){
						 isOver = true;
					});
					TaskManager.Run(fail);
				}
			});
			
			TaskManager.Run(web);
		
		};
		return task;
	
	}
	private function fail():Task{
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_fail); 
		
		
		return warning;
	}
	public function weixin(invitation:JsonData.Invitation):EZWeixin.SendTask{
	 	var weixin:EZWeixin = EZWeixin.GetInstance();
		var task:EZWeixin.SendTask = weixin.sendTask();
		var data:JsonData.WeixinData = new JsonData.WeixinData();
		data.invitation = invitation;
		var json:String = JsonData.WeixinData.Save(data);
		task.send(_title, _description, json, _url, _image, false); 
		return task;
	} 
	public function send2WeixinFail(invitation:JsonData.Invitation):Task{
	
		var tl:TaskList = new TaskList(); 
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3f;
		loading.alpha = 0.5f;
		loading.text = EZDictionary.LookUp("!loading");
		 
		tl.push(loading);
		tl.push(this.fail()); 
		
		var table:EZPlayerTable = EZPlayerTable.GetInstance();
		tl.push(table.invitationFail(invitation)); 
		 
		 
		 
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		tl.push(loaded);
		
		
		TaskManager.PushBack(tl, function(){
			this.setup();
		});
	
		return tl;
	
	}

	public function send2Weixin():EZWeixinInvitationTask{
		var wtask:EZWeixinInvitationTask = new EZWeixinInvitationTask();
		wtask.init = function(){ 
			wtask.over = false;
			var tl:TaskList = new TaskList();
	
			var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading.time = 0.3f;
			loading.alpha = 0.5f;
			loading.text = EZDictionary.LookUp("!loading");
			
			tl.push(loading);
			tl.push(s2wImpl(wtask));
			var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
			loaded.time = 0.3f;
			tl.push(loaded);
			TaskManager.PushBack(tl, function(){
				wtask.over = true;
			});
			TaskManager.Run(tl);
		};
		
			
		 
	
		return wtask;
	}
}