#pragma strict

class EZShopInGame extends MonoBehaviour{
	public var _diamond:EZShopDiamondView = null;
	public var _background:EZShopInGameBackground = null;
	public var _back:EZShopInGameBack = null;
	
	private static var instance_:EZShopInGame = null;
	public function get diamond():EZShopDiamondView{
		return _diamond;
	}
	public static function GetInstance():EZShopInGame{
		return this.instance_;
	}
	public function Awake(){
		this.instance_ = this;
		/*
		var task = new Task();
		task.shutdown = function(){
			var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			target.SendMessage("onAction", "shop_do", SendMessageOptions.DontRequireReceiver);
		};
		_diamond.paymentOver = task;*/
	}
	/*
	public function Start(){
		this.instance_ = this;
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(1);
		tl.push(wait);
		tl.push(openTask());
		TaskManager.Run(tl);
	
	}*/
	
	
	public function openTask():Task{
	
		var tl:TaskList = new TaskList();
		var shopTable:EZShopTable = EZShopTable.GetInstance();
	
		/*
		if(!shopTable.isLoaded){
			var mt:MultiTask = new MultiTask();
			var load:Task = shopTable.load();
			mt.push(load);
			var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading.time = 0.3;
			loading.alpha = 0.5;
			loading.text = EZDictionary.LookUp("!loading");
			mt.push(loading);
			tl.push(mt);
		}*/
		var mt2:MultiTask = new MultiTask();
		
		mt2.push(_back.openTask());	
		mt2.push(_diamond.openTask());
		mt2.push(_background.openTask());
		
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.2;
		
		mt2.push(loaded);	
		
		tl.push(mt2);
		return tl;
	}
	public function close(){
		_diamond.close();
		_back.close();
		_background.close();
		
		
	}

}