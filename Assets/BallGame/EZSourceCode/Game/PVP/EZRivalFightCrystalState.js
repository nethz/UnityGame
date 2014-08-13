#pragma strict
class EZRivalFightCrystalState extends State{
//	private var isOver_:boolean;
//	private var isPass_:boolean;
	public function  EZRivalFightCrystalState(){
	
	
	}
	
	
	public function start(){
	
		//isOver_ = false;
		//isPass_ = true;
		/*
		var tl:TaskList = new TaskList();
		var web:WebLoaderTask = EZSceneTable.GetInstance().useCrystal();
		tl.push(web);
		TaskManager.PushFront(tl, function(){
			if(EZCrystalInGame.GetInstance()){
				EZCrystalInGame.GetInstance().web();
			}
		});
		
		
		
		
		
		TaskManager.PushBack(tl, function(){
		
			
			var info:JsonData.CrystalTechInfo = web.data as JsonData.CrystalTechInfo;
			isOver_ = true;
			if(info && info.succeed){
				
				EZModel.CrystalLoader(info.crystal);
				if(EZCrystalInGame.GetInstance()){
					EZCrystalInGame.GetInstance().reset(info.crystal.mp, info.crystal.maxMp);
				}
				
				isPass_ = true;
				ActionManager.Run("model.rival.crystal");
			}else{
				
				isPass_ = false;
				var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
				task.addText(EZDictionary.LookUp("!no_web"));
				TaskManager.Run(task);
			}
			
		
		});
		TaskManager.Run(tl);*/
		
	}
	public function update(d:float):String{
//		if(isOver_){
				return "fight.run.start";
//		}
//		return "";
	}
	public function over(){
	/*
		var sort:EZIDListAction = ActionManager.Create("model.calc.sort");
		ActionManager.Run(sort);
		EZCtrl.SpeedBar(sort.list);
		
		for(var i:int = 0; i<sort.list.Length; ++i){
			EZCtrl.ViewFoeBar(sort.list[i], 1);
		}*/
	
	}
}
