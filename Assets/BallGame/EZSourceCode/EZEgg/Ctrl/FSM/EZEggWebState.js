#pragma strict

class EZEggWebState extends StateWithEventMap{

	private var ctrl_:EZEggCtrl = null;
	private var isDraw_:boolean = false;
	private var isError_:boolean = false;
	public function EZEggWebState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
	}
	
	
	public function start(){
	
		isDraw_ = false;
		isError_ = false;
		var draw:EZCardDrawLoad = null;
		if(ctrl_.drawMode == EggWindow.Mode.Money){
			draw = EZBagTable.GetInstance().moneyDraw(ctrl_.drawCount);
		}else if(ctrl_.drawMode == EggWindow.Mode.Diamond){
			draw = EZBagTable.GetInstance().diamondDraw(ctrl_.drawCount);
		}
		if(draw){
			var tl:TaskList = new TaskList();
			
			
			var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading.time = 0;
			loading.alpha = 0.5;
			loading.text = EZDictionary.LookUp("!loading");
			tl.push(loading);
		
		
			TaskManager.PushBack(draw.taskList, function(){
				ctrl_.cards = draw.cards;
			});
			tl.push(draw.taskList);
			
			var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
			loaded.time = 0.3;
		
			tl.push(loaded);
			TaskManager.PushBack(tl, function(){
				isDraw_= true;
			});
			TaskManager.Run(tl);
		}else{
			isError_ = true;
		}
		
		
	}
	public function update(d:float){
		if(isDraw_){
			return "egg.draw";
		}else if(isError_){
			return "egg.main.input";
		}
		return "";
	}
	
}