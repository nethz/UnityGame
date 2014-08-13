#pragma strict


class EZLoadState extends StateWithEventMap{

	private var isOver_:boolean = false;
	private var loader_:EZLoader = null;
	private var hero_:JsonData.Hero = null;
	private var level_:JsonData.LevelData = null;
	private var crystal_:JsonData.CrystalTech = null;
	private var doc_:JsonData.LevelDoc = null;
	private var map_:EZGameMapView = null;
	private var dialog_:EZGameDialogView = null;
	public function EZLoadState(loader:EZLoader, dialog:EZGameDialogView, map:EZGameMapView){
		loader_ = loader;
		dialog_ = dialog;
		map_ = map;
	}
	public function start(){ 
	
		
		var hero:JsonData.Hero = null; 
		var level:JsonData.LevelData = null;
		var crystal:JsonData.CrystalTech = null;
		
		
		var tl:TaskList = new TaskList();
#if UNITY_EDITOR
		if(!EZSetupTable.GetInstance().isLoaded){
			tl.push(EZSetupTable.GetInstance().load());
		}
#endif
	
		
		
		var sTask:Task = loader_.startTask();
		TaskManager.PushBack(sTask, function(){
			hero_ = loader_.loadHero();
			level_ = loader_.loadLevel();
			crystal_ = loader_.loadCrystal();
			Debug.Log(crystal_);
			doc_ = loader_.loadDoc();
			map_.setup(level_);
		});
		
		tl.push(sTask);
		
		
		tl.push(this.loadCrystal());
		tl.push(this.loadBackground());
		tl.push(this.preloadFoe());
		tl.push(this.loadLevel());
		tl.push(this.loadHero());
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;
		TaskManager.PushFront(
		loaded,
		function(){
			if(EZCrystalInGame.GetInstance()){
				if(crystal_ && crystal_.tech != null){
					EZCrystalInGame.GetInstance().annihilate = false;
					EZCrystalInGame.GetInstance().setup(crystal_.mp, crystal_.maxMp, crystal_.cry, crystal_.group, crystal_.lv);
					EZCtrl.ViewCrystal(false);
				}else{
					EZCrystalInGame.GetInstance().annihilate = true;
				}
			}
			
		}
		);
		tl.push(loaded);
		tl.push(this.readyTask());
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	public function update(d:float):String{
		if(isOver_){
			return "next";
		}
		return "";
		
	}
	
	
	
	
	
	private function loadBackground():Task{
		var task:Task = new Task();
		TaskManager.PushBack(task, function(){
			var loader:EZLoadAction = ActionManager.Create("view.background.loader");
			loader.load(doc_.scene);
			ActionManager.Run(loader);
		});
		return task;
	}
	private function loadLevel():Task{
	
		var task:Task = new Task();
		TaskManager.PushBack(task, function(){
		
			
			EZModel.LevelLoader(level_.strongholds, doc_.wave);
		});
		return task;
	
		
		
	}
	private function loadCrystal():Task{
		
		var task:Task = new Task();
		TaskManager.PushBack(task, function(){
			if(crystal_ && crystal_.tech != null){
				Debug.Log(JsonData.CrystalTech.Save(crystal_));
				EZModel.HeroCrystalLoader(crystal_);
			}
		});
		return task;
	}
	public function getSoulKey(data:JsonData.ThePosition):Geek.SoulKey{
		if(data == null){
			return new Geek.SoulKey("none", Geek.MagicType.Wood);
		}
		var key:Geek.SoulKey = new Geek.SoulKey(data.soul.natureProp.style, Geek.GetMagicType(data.soul.natureProp.type));
		return key;
	}
	private function preloadFoe():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			var loader:EZFoePreloaderTask = TaskManager.Create("view.foe.preloader") as EZFoePreloaderTask;
				
			for(var i:int = 0; i< level_.strongholds.Length; ++i){
				var stronghold:JsonData.Stronghold = level_.strongholds[i];
				loader.addBattle(this.getSoulKey(stronghold.battle));
				loader.addBag1(this.getSoulKey(stronghold.bag1));
				loader.addBag2(this.getSoulKey(stronghold.bag2));
			}
			
			loader.addBattle(new Geek.SoulKey("box", Geek.MagicType.Metal));
			loader.addBag1(this.getSoulKey(null));
			loader.addBag2(this.getSoulKey(null));
			TaskManager.PushBack(loader, function(){
				isOver = true;
			});
			TaskManager.Run(loader);
		
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	
	private function loadHero():Task{
	
		
		
		var task:EZPlayerLoaderTask = TaskManager.Create("view.player.loader") as EZPlayerLoaderTask;
		
		TaskManager.PushFront(task, function(){
			
		Debug.Log(hero_);
			task.player =  hero_.avatar;
			if(hero_.battle){
				task.battle = new Geek.SoulKey(hero_.battle.natureProp.style, Geek.GetMagicType(hero_.battle.natureProp.type));
			}
			if(hero_.bag1){
				task.bag1 = new Geek.SoulKey(hero_.bag1.natureProp.style, Geek.GetMagicType(hero_.bag1.natureProp.type));
			}
			if(hero_.bag2){
				task.bag2 =new Geek.SoulKey(hero_.bag2.natureProp.style, Geek.GetMagicType(hero_.bag2.natureProp.type));
			}
		
			var loader:EZHeroLoaderAction = ActionManager.Create("model.hero.loader") as EZHeroLoaderAction;
			loader.load(hero_); 
			ActionManager.Run(loader); 
		});
		
		return task;
	}

	public function showTask():Task{
		var tl:TaskList = new TaskList();
		var task:Task = new Task();
		var isOver:boolean = false;
		task.isOver = function():boolean{
			return isOver;
		};
		task.init = function(){
			if(level_ ){
			
				var show:Task = null;
				
				if(doc_.talks != null){
					show = dialog_.showTextTask(doc_.talks);
				}else if(!String.IsNullOrEmpty(doc_.talk)){
					show = dialog_.showTextTask(doc_.talk);
				}else{
					show = new Task();
				}
		
				TaskManager.PushBack(show, function(){
					isOver = true;
				});
				TaskManager.Run(show);
			}else{
				isOver = true;
			}
		
		};
		tl.push(task);
		var mt:MultiTask = new MultiTask();
		if(EZCrystalInGame.GetInstance()){
			mt.push(EZCrystalInGame.GetInstance().hideTask());
		}
		mt.push(map_.showMapTask());
		tl.push(mt);
		return tl;
	
	}
	public function readyTask():Task{
		var mt:MultiTask = new MultiTask();
		
		var task:Task = TaskManager.Create("rpg.camera.left") as Task; 
		mt.push(task);
		mt.push(showTask());
		TaskManager.PushFront(mt, 
			function(){
				EZCtrl.ViewHpBar(0);
				EZCtrl.ViewSkillBar(0, false);
				if(hero_.bag1){
					EZCtrl.ViewMagicBar(1, 0);
					EZCtrl.ViewHpBar(1);
				}
				if(hero_.bag2){
					EZCtrl.ViewMagicBar(2, 0);
					EZCtrl.ViewHpBar(2);
				}
				
				
			}
		);
		
		return mt;
	}
	public function over(){
	
		EZHeroFactories.Release();
		EZMonsterFactories.Release();
	}
}