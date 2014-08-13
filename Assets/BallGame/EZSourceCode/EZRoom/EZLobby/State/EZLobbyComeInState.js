#pragma strict

class EZLobbyComeInState extends State{
	private var lobby_:EZLobbyCtrl = null;
	private var isOver_:boolean = false;
	public function EZLobbyComeInState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
	}
	public function start(){
		Debug.LogWarning("EZLobbyComeInState");
		isOver_ = false;
		
		var tl:TaskList = new TaskList();
		var home:EZHomeTable = EZHomeTable.GetInstance();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
		
		tl.push(home.reload());
	
		var loadHero:Task = lobby_.loadHeroTask(1);
		
		tl.push(loadHero);
		
		TaskManager.PushBack(loadHero, function(){
			lobby_.loadWeather();
			lobby_.loadOther();
			lobby_.comeIn();
			lobby_.guide.open();
		});
		
		if(EZGlobal.GetInstance().stateName == ""){
			var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
			loaded.time = 0.3;  
			tl.push(loaded);
		}
		
		
		
		
		tl.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Home));
	
	
		TaskManager.PushBack(tl, function(){
			Debug.Log("isOver");
			isOver_ = true;
		});
	
		TaskManager.Run(tl);
		
	}
	public function update(d:float):String{
		
		if(isOver_){
			if(EZGlobal.GetInstance().stateName == "Shop"){
				return "play.shop";
			}else if(EZGlobal.GetInstance().stateName == "Setting"){
				return "play.setting";
			}
			Debug.Log("EZLobbyComeInState is Over");
			return "play";
		}
		return "";
	}
}