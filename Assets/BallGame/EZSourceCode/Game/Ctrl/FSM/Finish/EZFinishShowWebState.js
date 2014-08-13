#pragma strict


class EZFinishShowWebState extends State{
	private var loader_:EZLoader;
	private var isOver_:boolean = false;
	function EZFinishShowWebState(loader:EZLoader){
		loader_ = loader;
	}
	function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 0;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
		var task:Task =loader_.finishTask();
		tl.push(task);
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;  
		tl.push(loaded);
		
		TaskManager.PushBack(tl,
			 function(){
			 	var player:JsonData.Player = EZPlayerTable.GetInstance().data;
				var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
				GameWinView.GetInstance().setup(loader_.loadDoc(), loader_.loadHarvest(), loader_.loadPlayer(), setup);
				isOver_  = true;
		 	}
		);
		TaskManager.Run(tl);
		
	}
	function update(d:float):String{
		if(isOver_){
			return "finish.show.over";
		}
		return "";
	}
	
}