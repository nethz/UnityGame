#pragma strict

class EZCryCompWebState extends StateWithEventMap{
	private var comp_:EZCryCompCtrl;
	private var isOver_:boolean = false;
	function EZCryCompWebState(comp:EZCryCompCtrl){
		comp_ = comp;
	}
	function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 0.5;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
		var magicBall:EZMagicBallTable = EZMagicBallTable.GetInstance();
		var crystal:EZCrystalTable = EZCrystalTable.GetInstance();
		var comp:Task = magicBall.compose(crystal.data.ball.group);
		tl.push(comp);
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		tl.push(loaded);
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	function update(d:float):String{
		if(isOver_){
			return "comp.animation";
		}
		return "";
	}
	function over(){
	
		
	}

}