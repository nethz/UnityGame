#pragma strict

class EZTableLoader extends EZLoader{

	public var hero_:JsonData.Hero = null;
	public var level_:JsonData.LevelData = null;
	public var crystal_:JsonData.CrystalTech = null;
	public var harvest_:JsonData.Harvest = null;
	public var doc_:JsonData.LevelDoc = null;
		
	public function loadDoc():JsonData.LevelDoc{
		Debug.LogWarning(JsonData.LevelDoc.Save(doc_));
		return doc_;
	}
	public function loadLevelTask():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			
			var sceneTable:EZSceneTable = EZSceneTable.GetInstance();
			if(!sceneTable.isLoaded){
				var task:Task = sceneTable.load(1, 'no_cache');
				TaskManager.PushBack(task, function(){
					isOver = true;
				});
				TaskManager.Run(task);
			}else{
				isOver = true;
			}
		};
		task.isOver = function(){
			return isOver;
		};
		
		return task;
	}
	
	public function loadDocTask():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			
			var docTable:EZLevelDocTable = EZLevelDocTable.GetInstance();
			if(!docTable.isLoaded){
				var task:Task = docTable.loadTask("test", 0, true);
				TaskManager.PushBack(task, function(){
					isOver = true;
				});
				TaskManager.Run(task);
			}else{
				isOver = true;
			}
		
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}
	public function startTask():Task{
		var tl:TaskList = new TaskList();
		
		tl.push(loadLevelTask());
		tl.push(loadDocTask());
		TaskManager.PushBack(tl, function(){
			
			var sceneTable:EZSceneTable = EZSceneTable.GetInstance();
			var data:JsonData.Scene = sceneTable.data;
			Debug.LogWarning(JsonData.Scene.Save(data));
			hero_ = data.hero;
			level_ = data.level;
			crystal_ = data.crystal;
			
			if(crystal_ && crystal_.tech == null){
				crystal_ = null;
			}
			var docTable:EZLevelDocTable = EZLevelDocTable.GetInstance();
			doc_ = docTable.curr;
			
		});
		return tl;
	}
	
	public function finishTask():Task{
		
		var tl:TaskList = new TaskList();
		var harvestTable:EZHarvestTable = EZHarvestTable.GetInstance();
		
		tl.push(harvestTable.load(level_.uuid));
		
		
		TaskManager.PushBack(tl, function(){
			harvest_ = harvestTable.data;
		});
		return tl;
	}
	public function loadHero():JsonData.Hero{
		return hero_;
	}
	public function loadLevel():JsonData.LevelData {
		return level_;
	}
	

	public function loadCrystal():JsonData.CrystalTech {
		return crystal_;
	}
	public function loadHarvest():JsonData.Harvest{
		return harvest_;
	}
		
	public function loadPlayer():JsonData.Player{
		return EZPlayerTable.GetInstance().data;
	}
//	public function loadSetup():JsonData.Setup{//
//		return EZSetupTable.GetInstance().data;
//	}


}