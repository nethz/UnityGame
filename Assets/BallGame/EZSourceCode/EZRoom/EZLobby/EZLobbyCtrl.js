#pragma strict

class EZLobbyCtrl extends MonoBehaviour{
	
	public var _view:EZLobbyView;
	public var _debug:boolean = false;
	public var _message:EZMessageButtonsManager = null;
	public var _ap:EZApCtrl = null;
	public var _stars:EZLobbyStar[] = null;
	public var _guide:EZHomeGuide = null;
	public var _lobbyCamera:EZLobbyCamera = null;
	public var _logo:EZLobbyLogo = null;
	public var _ball:GameObject = null;
	
	public var _noLoginText:String ="no login!";
	public function get logo():EZLobbyLogo{
		return _logo;
	}
	public function noLoginTask():Task{
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_noLoginText);
		return warning;
	}
	
	
	public function comeIn(){
		 _lobbyCamera.comeIn();
	}
	
	public function firstIn(){
		this.view.closeUI();
		_lobbyCamera.firstIn();
	}
	public function get isDebug():boolean{
		return _debug;
	}
	public function get guide():EZHomeGuide{
		return _guide;
	}
	public function loadStar(){
		EZSubscriptManager.GetInstance().load();
		for(var i:int =0; i<_stars.Length; ++i){
			_stars[i].load();
		}
	}
	public function loadMessage(){
		_message.setup();
	}
	
	public function receiveMessage(){
		var tl:TaskList = new TaskList();
		
			
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 0.5;
		loading.text = EZDictionary.LookUp("!loading");
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;
		
		tl.push(loading);
		tl.push(EZMessageBagTable.GetInstance().reload());
		TaskManager.PushFront(loaded, function(){
			loadMessage();
		});
		tl.push(loaded);
		
		return tl;
	}
	public function loadPlayer(){
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		_view.lv = (player.lv +1).ToString();
		if(setup.player.isMax(player.exp)){
			_view.expText = "MAX";
		}else{
			_view.expText = Mathf.FloorToInt(setup.player.getExp(player.exp)).ToString() + "/" + Mathf.FloorToInt(setup.player.getMax(player.exp)).ToString();
		}
		_ap.refresh();
		_view.exp = setup.player.getExpBar(player.exp);
		_view.diamond = player.diamond.ToString();
	}
	public function loadBag(){
		var bag:JsonData.Bag = EZBagTable.GetInstance().bag;
		_view.money = bag.money.ToString();
		_view.bag =  bag.list.Length.ToString()+"/"+bag.max.ToString();
		
		
	}
	public function loadWeather(){
	
		var weather:JsonData.Weather = EZWeatherTable.GetInstance().data;
		_view.weather.setup(weather);
	
	}
	
	public function loadQuest(){
		var questBag:JsonData.QuestBag = EZQuestBagTable.GetInstance().bag;
		
		
		_view.settingButton.isEnabled = true;
		if(questBag.empty()){
			_view.questButton.isEnabled = false;
		}else{
			_view.questButton.isEnabled = true;
		}
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(guide.canEgg){
			_view.eggButton.isEnabled = true;
		}else{
			_view.eggButton.isEnabled = false;
		}
		
		
		
		if(guide.canShop){
			_view.shopButton.isEnabled = true;
		}else{
			_view.shopButton.isEnabled = false;
		}
		
		
	}
	public function loadCrystal(){
		var crystal:JsonData.Crystal = EZCrystalTable.GetInstance().data;
		_view.crystal.setup(crystal);
		
	}
	public function loadHeroName(){
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		_view.hero.rename(player.name);
	}
	public function loadHeroTask(alpha:float):Task{
		var isOver:boolean = false;
		var task:Task = new Task();
		task.init = function(){
			var player:JsonData.Player = EZPlayerTable.GetInstance().data;
			var load:Task = _view.hero.loadTask(player.avatar, player.name);
			TaskManager.PushBack(load, function(){
				isOver = true;
			});
		
			TaskManager.Run(load);
		};
		task.shutdown = function(){ 
			_view.hero.setAlpha(alpha);
			return isOver;
		};
		return task;
	}
	
	public function loadOther(){
		
	
		loadMessage();
		loadCrystal();
		loadPlayer();
		loadQuest();
		loadBag();
		loadMagicBall();
		loadStar();
	}
	public function loadMagicBall(){
	
		
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(guide.canCrystal){
			 _ball.SetActive(true);
		}else{
			 _ball.SetActive(false);
		}
		
		
	
		
	}
	public function get view():EZLobbyView{
		return _view;
	}
	
	public function refresh(){
		loadMessage();
		loadCrystal();
		loadPlayer();
		loadBag();
		loadMagicBall();
		loadStar();
	}

	
}
