#pragma strict

class EZOutPetLoadingState extends State{
	private var ctrl_:EZCardCtrl;
	
	private var isOver_:boolean = false;
	private var startState_:EZCardCtrl.State = EZCardCtrl.State.Info;
	public function EZOutPetLoadingState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	} 
	public function preloadCard():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			var card:EZCard = ctrl_.info.card;
			var info:Task = ctrl_.info.setPetInfoTask(card);
			
			TaskManager.PushBack(info, function(){
				isOver = true;
			});
			TaskManager.Run(info);
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	
	}
	
	public function start(){
		
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
	
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		var player:EZPlayerTable = EZPlayerTable.GetInstance();
		
		#if UNITY_EDITOR
			
			if(!setup.isLoaded){
				tl.push(setup.load());
			}
		
			if(!player.isLoaded){
				tl.push(player.reload());
			}
		#endif
		
		
	
		
		//var bagTable:EZBagTable = EZBagTable.GetInstance();
		//tl.push(bagTable.quickLoadTask());
		
		var ub:Task = ctrl_.updateBag(true);
		TaskManager.PushBack(ub, function(){
			ctrl_.setup(player.data, setup.data);
			
			ctrl_.info.switchBtnAffix("petDetailsOn");
			ctrl_.info.showAffixInfo(false);
			startState_ = ctrl_.openState();
			ctrl_.refresh();
			
		});
		tl.push(ub);
		tl.push(preloadCard());
		
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.5;
		TaskManager.PushBack(loaded, function(){
			isOver_= true;
		});
		tl.push(loaded);
		TaskManager.Run(tl);
		
	}
	public function update(d:float){
		if(isOver_){
			var team:JsonData.Team = EZTeamTable.GetInstance().data;
			var bag:JsonData.Bag = EZBagTable.GetInstance().bag; 
			if(startState_ == EZCardCtrl.State.Team){
				return "team.input";
			}else if(startState_ == EZCardCtrl.State.Sell){
				return "sell.input";
			}else if(startState_ == EZCardCtrl.State.Comp){
				return "comp.input";
			}else{
				return "info.input";
			}
			
		}
		return "";
	}
	
}