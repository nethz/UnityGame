#pragma strict
class EZCryNormalCtrl extends MonoBehaviour{


	enum Mode{
		Select,
		Give,
	};
	public var _view:EZCryNormalView;
	public var _buttons:EZCryButtons;
	public var _frags:EZCryFragViewManager;
	public var _balls:EZMagicBallViewManager;
	public var _spells:EZCrySpellViewManager;
	public var _subscriptKey:String = "crystal";
	
	public var _ok:String = "ok";
	public var _cancel:String = "cancel";
	public var _weixinBegin:String = "weixin";
	public var _weixinEnd:String = "weixin";
	public var _magicType:String[];
	
	public var _title:String = "title";
	public var _description:String = "_description";
	public var _url:String = "http://www.ezdoing.com";
	public var _fail:String = "fail";
	public var _magicTypeImage:String[];
	public function s2wImpl(wt:EZWeixinCrystalTask, magicType:Geek.MagicType):Task{
		var task:Task = new Task();
		
		var isOver:boolean = false;
		task.isOver = function():boolean{
			return isOver;
		};
		
		task.init = function(){
			var table:EZMagicBallTable = EZMagicBallTable.GetInstance();
			var web:WebLoaderTask = table.give(magicType);
			TaskManager.PushBack(web, function(){
				var info:JsonData.WeixinCrystalInfo = web.data as JsonData.WeixinCrystalInfo;
				if(info && info.succeed){   
					load();
					var wx:EZWeixin.SendTask = weixin(info.give) as EZWeixin.SendTask;
					TaskManager.PushBack(wx, function(){
						Debug.LogWarning("!!!!" + wx.result);
						 wt.result = wx.result;
						 wt.crystal = info.give;
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
		TaskManager.PushBack(task,function(){
			Debug.LogWarning("asdf");
		
		});
		return task;
	
	}
	public function fail():Task{
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_fail);
		return warning;
	}
	public function weixin(crystal:JsonData.WeixinCrystal):EZWeixin.SendTask{
	 	var weixin:EZWeixin = EZWeixin.GetInstance();
	 	Debug.Log("weixin:" + weixin);
		var task:EZWeixin.SendTask = weixin.sendTask();
		var data:JsonData.WeixinData = new JsonData.WeixinData();
		data.crystal = crystal;
		var json:String = JsonData.WeixinData.Save(data);
		Debug.LogWarning(json);
		task.send(_title, _description, json, _url, _magicTypeImage[crystal.type], false); 
		return task;
	}
	public function send2WeixinFail(crystal:JsonData.WeixinCrystal){
		var tl:TaskList = new TaskList(); 
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3f;
		loading.alpha = 0.5f;
		loading.text = EZDictionary.LookUp("!loading");
		 
		tl.push(loading);
		tl.push(this.fail()); 
		
		var table:EZMagicBallTable = EZMagicBallTable.GetInstance();
		
		tl.push(table.giveFail(crystal)); 
		 
		 
		 
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		tl.push(loaded);
		
		
		TaskManager.PushBack(tl, function(){
			this.proload();
		});
	
		return tl;
	
	}
	public function send2Weixin(magicType:Geek.MagicType):EZWeixinCrystalTask{
		var wt:EZWeixinCrystalTask = new EZWeixinCrystalTask();
		wt.init = function(){
			var tl:TaskList = new TaskList();
		
			var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading.time = 0.3f;
			loading.alpha = 0.5f;
			loading.text = EZDictionary.LookUp("!loading");
			
			tl.push(loading);
			
			tl.push(s2wImpl(wt, magicType));
			
			
			var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
			loaded.time = 0.3f;
			tl.push(loaded);
			TaskManager.PushBack(tl, function(){
				wt.over = true;
			});
			TaskManager.Run(tl);
		};
		
		
		return wt;
	}
	public function weixinTask(magicType:Geek.MagicType):EZWindowTask{ 
	 
		var weixin:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		weixin.text = _weixinBegin +_magicType[magicType]+ _weixinEnd;
		weixin.ok = _ok;
		weixin.cancel = _cancel;
		return weixin;
	}
	public function loadBall(subscript:EZSubscript){
		
		
		var data:JsonData.MagicBall = EZMagicBallTable.GetInstance().data;
		var setup:JsonData.BallSetup = data.setup;
		
		_balls.reset();
		var ballBag:JsonData.BallBag = data.ballBag;
		if(ballBag && ballBag.balls){
			
			for(var p:int =0; p < ballBag.balls.Length; ++p ){
				var ball:JsonData.Ball = ballBag.balls[p];
				_balls.setup(subscript, ball.group, setup.getLv(ball.exp), setup.getExp(ball.exp), setup.getMax(ball.exp));
			}
		}
		
	
	}
	public function loadFrag(){
		var data:JsonData.MagicBall = EZMagicBallTable.GetInstance().data;
		var setup:JsonData.BallSetup = data.setup;
		
		if(data.frags && data.others ){
			for(var i:int = 0; i< data.fragsLength(); ++i){
				_frags.frags[i].has = new EZCryFragView.Frag(data.frags[i], data.others[i]);
			}
		}
		if(setup){
			for(var j:int = 0; j< _frags.frags.Length; ++j){
				_frags.frags[j].max = setup.fragMax;
			}
		}
	
	}
	public function loadSpell(subscript:EZSubscript){
		
		var data:JsonData.MagicBall = EZMagicBallTable.GetInstance().data;
		var setup:JsonData.BallSetup = data.setup;
		
		_spells.reset();
		var cryBag:JsonData.CryBag = data.cryBag;
		
		if(cryBag && cryBag.cries){
			for(var q:int =0; q < cryBag.cries.Length; ++q ){
			
				var cry:JsonData.Cry = cryBag.cries[q];//setup.getLv(ball.exp)
				_spells.setup(subscript, cry.id, 0);
			}
		}
		
		_view.setup(data);
	
	
	}
	public function load(){
		 
		var sm:EZSubscriptManager = EZSubscriptManager.GetInstance();
		var subscript:EZSubscript = sm.getSubscript(_subscriptKey);
		loadFrag();
		loadSpell(subscript);
		loadBall(subscript);
		

		var crystal:JsonData.Crystal = EZCrystalTable.GetInstance().data;
	
		
	
		ballSelected(crystal.ball.group);
		spellSelected(crystal.cry.id);
	}
	
	public function proload(){
		 
		loadFrag();
		loadSpell(null);
		loadBall(null);
		

		var crystal:JsonData.Crystal = EZCrystalTable.GetInstance().data;
	
	
		ballSelected(crystal.ball.group);
		spellSelected(crystal.cry.id);
	}
	
	
	public function ballSelected(id:int){
		_balls.selected = id;
		_balls.resetSelected();
	}
	public function spellSelected(id:int){
		_spells.selected = id;
		_spells.resetSelected();
	}
	public function setMode(mode:EZCryNormalCtrl.Mode){
		_buttons.setMode(mode);
		_frags.setMode(mode);
	}
	
	public function getFragGive(id:int):int{
			
		var frags:EZCryFragView[] = _frags.frags;
		return frags[id].give;
	}
	public function getFragHas(id:int):int{
			
		var frags:EZCryFragView[] = _frags.frags;
		return frags[id].has.count();
	}
	public function open(){
		_view.open();
	}
	public function close(){
		_view.close();
	}
	
}