#pragma strict

class MissionEnergyWebState extends StateWithEventMap{
	private var isOver_:boolean = false; 
	public function MissionEnergyWebState(){
		
	}
	
	public function start(){
		Debug.Log("<--------MissionEnergyWebState start!!!---------->");
		isOver_ = false;
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 0.5;
		loading.text = EZDictionary.LookUp("!full_aping");
		var table:EZShopTable = EZShopTable.GetInstance();
		var web:WebLoaderTask = table.fullAp();
		TaskManager.PushBack(web, function(){
			var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
			if(info && info.succeed){
				var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
				warning.addText(EZDictionary.LookUp("!full_aped"));
				TaskManager.Run(warning);
			}
		});
		var mt:MultiTask = new MultiTask();
		mt.push(loading);
		mt.push(web);
		TaskManager.PushBack(mt, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(mt);
	}
	
	public function update(d:float):String{
		if(isOver_){
			return "pve.level.main";
		}
		return "";
	}
	
	public function over(){
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;
		TaskManager.Run(loaded);
	}
}