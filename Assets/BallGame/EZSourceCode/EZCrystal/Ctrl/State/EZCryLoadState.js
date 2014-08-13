#pragma strict

class EZCryLoadState extends StateWithEventMap{

	private var normal_:EZCryNormalCtrl;
	private var isOver_:boolean = false;
	
	function EZCryLoadState(normal:EZCryNormalCtrl){
		normal_ = normal;
	}
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var mt:MultiTask = new MultiTask();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		mt.push(loading);
		
		
		mt.push(EZBroadcast.GetInstance().openTask(EZDictionaryScene.SceneName.Crystal));
#if UNITY_EDITOR
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		if(!setup.isLoaded){
			mt.push(setup.load());
		}
		
		
		
#endif
		
		var magicBall:EZMagicBallTable = EZMagicBallTable.GetInstance();
		if(!magicBall.isLoaded){
			mt.push(magicBall.reload());
		}
		
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		
		tl.push(mt);
		tl.push(loaded);
		
		TaskManager.PushFront(loaded, function(){
			normal_.proload();
			normal_.setMode(EZCryNormalCtrl.Mode.Select);
			normal_.open();
		});
		TaskManager.PushBack(tl, function(){
			Debug.LogWarning("fffff");
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	
	public function update(d:float):String{
		if(isOver_){
			return "normal.select";
		}
		return "";
	}
	public function over(){
		
		
	}
}