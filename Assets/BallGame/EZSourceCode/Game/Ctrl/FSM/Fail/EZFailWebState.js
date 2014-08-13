#pragma strict

class EZFailWebState extends State{
	private var isOver_:boolean = false;
	
	private var context_:EZModelContext = null;
	private var revive_:boolean = false;
		
	public function EZFailWebState(context:EZModelContext){
		context_ = context;
	}
	public function start(){
	
		context_.pause = true;
		isOver_ = false;
		
		var tl:TaskList = new TaskList();
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 0.5;
		loading.text = EZDictionary.LookUp("!loading");
		
		tl.push(loading);
		
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		var revive:WebLoaderTask = player.revive();
		tl.push(revive);
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;
		TaskManager.Run(loaded);
		tl.push(loaded);
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
			
			var info:JsonData.PlayerInfo = revive.data as JsonData.PlayerInfo;
			revive_ = true;
		
		});
		TaskManager.Run(tl);
	}
	public function over(){
		context_.pause = false;
	}
	public function update(d:float):String{
		if(isOver_){
			Debug.Log(context_.pause);
			if(revive_){
				return "fight.revive";
			}
			
		}
		return "";
		
	}
}