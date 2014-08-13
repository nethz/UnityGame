#pragma strict


class EZLoadDebugState extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var loader_:EZLoader = null;
	private var map_:EZGameMapView = null;
	private var dialog_:EZGameDialogView = null;
	private var context_:EZModelContext = null;
	public function EZLoadDebugState(loader:EZLoader,  dialog:EZGameDialogView,  map:EZGameMapView, context:EZModelContext){
		loader_ = loader;
		dialog_ = dialog;
		map_ = map;
		context_ = context;
	}
	private function affixDebug():JsonData.JsonPack{
		var affix:JsonData.JsonPack = null;
		return affix;
	
	}
	private function techDebug():JsonData.TechInfo{
	 
	 	var tech:JsonData.TechInfo = new JsonData.TechInfo();  
	 	tech.type = "abc";
	 	tech.affixes = new JsonData.JsonPack[4];
	 	for(var i =0;i<4; ++i){
	 		 tech.affixes[i] = affixDebug();
	 	} 
	 	
	 	return tech;
	}
	private function debugSoul():JsonData.Soul{
		 var soul:JsonData.Soul = new JsonData.Soul(); 
		 
		 soul.natureProp = new JsonData.NatureProperty();
		 
		 soul.natureProp.style= "goblin";
		 soul.natureProp.type = "Fire";
		 soul.natureProp.group = 0;
		 
		 
		 soul.baseProp = new JsonData.BaseProperty();
		 soul.baseProp.maxHealth= 100;
		 soul.baseProp.speed= 10;
		 soul.baseProp.attack= 3;
		
		 soul.magicProp = new JsonData.MagicProperty();
		 soul.magicProp.maxPower = 10;
		 soul.magicProp.tech = techDebug();
		
		 soul.skillProp = new JsonData.SkillProperty();
		 soul.skillProp.tech = techDebug();;
		 return soul;
	}
	private function debugHero():JsonData.Hero{
		var hero:JsonData.Hero = new JsonData.Hero();
		hero.avatar = "boy";  
		hero.battle = debugSoul();
		hero.bag1 = debugSoul();
		hero.bag2 = debugSoul();
		
		return hero;
	
	} 
	private function debugMonster():JsonData.Monster{
		var monster:JsonData.Monster = new JsonData.Monster();
		monster.natureProp = new JsonData.NatureProperty();
		monster.natureProp.type = "Fire";
		monster.natureProp.style= "goblin";
		monster.natureProp.group= 0;
		monster.baseProp = new JsonData.BaseProperty();
		monster.baseProp.maxHealth= 100;
		monster.baseProp.speed= 10;
		monster.baseProp.attack= 3;
		
		return monster;
	}/*
	private function debugStronghold(i:float):JsonData.Stronghold{
		var stronghold:JsonData.Stronghold = new JsonData.Stronghold(); 
		
		stronghold.position = i;
		stronghold.type = "Wild";
		return stronghold;
	}*/
	public function start(){
		var data:JsonData.Setup = loader_.setup();
		if(data != null){
			EZSetupTable.GetInstance().save(data);
			_start();
		}else{
	#if UNITY_EDITOR
			var setup:Task = EZSetupTable.GetInstance().load();
			TaskManager.PushBack(setup, function(){
				_start();
			});
			TaskManager.Run(setup);
	#else
			_start();
	#endif
		}
	}
	private function _start(){	
	
		var tl:TaskList = new TaskList();
		isOver_ = false;
		var hero:JsonData.Hero = null; 
		var level:JsonData.LevelData = null;
		var crystal:JsonData.CrystalTech = null;
		var doc:JsonData.LevelDoc = null;
		
		hero = loader_.loadHero();
		level = loader_.loadLevel();
		crystal = loader_.loadCrystal();
		doc = loader_.loadDoc();
		
		
		map_.setup(level);
		
		var loader:EZLoadAction = ActionManager.Create("view.background.loader");
		loader.load(doc.scene);
	
		
		var playerLoader:EZPlayerLoaderTask = TaskManager.Create("view.player.loader") as EZPlayerLoaderTask;
		playerLoader.player =  hero.avatar;
		if(hero.battle){
			playerLoader.battle = new Geek.SoulKey(hero.battle.natureProp.style, Geek.GetMagicType(hero.battle.natureProp.type));
		}
		if(hero.bag1){
			playerLoader.bag1 = new Geek.SoulKey(hero.bag1.natureProp.style, Geek.GetMagicType(hero.bag1.natureProp.type));
		}
		if(hero.bag2){
			playerLoader.bag2 =new Geek.SoulKey(hero.bag2.natureProp.style, Geek.GetMagicType(hero.bag2.natureProp.type));
		}
		
		
		var heroLoader:EZHeroLoaderAction = ActionManager.Create("model.hero.loader") as EZHeroLoaderAction;
		heroLoader.load(hero);
		
		
		
		var tt:TaskList = new TaskList();
	
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;
		tt.push(loaded);
		
		var left:Task = TaskManager.Create("rpg.camera.left") as Task; 
		tt.push(left);
		
		
		
		TaskManager.PushBack(playerLoader, 
			function(){
				EZCtrl.ViewHpBar(0);
				EZCtrl.ViewSkillBar(0, false);
				if(hero.bag1){
					EZCtrl.ViewMagicBar(1, 0);
					EZCtrl.ViewHpBar(1);
				}
				if(hero.bag2){
					EZCtrl.ViewMagicBar(2, 0);
					EZCtrl.ViewHpBar(2);
				}
			}
		);
		
		
		if(EZCrystalInGame.GetInstance()){
			if(crystal){
				EZCrystalInGame.GetInstance().annihilate = false;
				EZCrystalInGame.GetInstance().setup(crystal.mp, crystal.maxMp, crystal.cry, crystal.group, crystal.lv);
				EZCtrl.ViewCrystal(false);
			}else{
				EZCrystalInGame.GetInstance().annihilate = true;
			}
		}
			
			
		EZModel.HeroCrystalLoader(crystal);
		
		
		ActionManager.Run(loader);
		
		EZModel.LevelLoader(level.strongholds, doc.wave);
		ActionManager.Run(heroLoader); 
	
		tl.push(preloadFoe(level));
		tl.push(playerLoader);
		var mt:MultiTask = new MultiTask();
		mt.push(tt);
		
		tl.push(mt);
		TaskManager.PushBack(tl, 
			function(){
			isOver_ = true;
		});
		
		tl.push(showTask(level, doc));
		TaskManager.Run(tl);
		
		
	
	}
	
	
	public function showTask(level:JsonData.LevelData, doc:JsonData.LevelDoc):Task{
		var tl:TaskList = new TaskList();
		var task:Task = new Task();
		var isOver:boolean = false;
		task.isOver = function():boolean{
			return isOver;
		};
		task.init = function(){
			var tl:TaskList = new TaskList();
			
			var show:Task = null;
			if(doc.talks != null){
				show = dialog_.showTextTask(doc.talks);
				tl.push(show);
			}else if(!String.IsNullOrEmpty(doc.talk)){
				show = dialog_.showTextTask(doc.talk);
				tl.push(show);
			}
		
			TaskManager.PushBack(tl, function(){
				isOver = true;
			});
			TaskManager.Run(tl);
		
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
	
	public function getSoulKey(data:JsonData.ThePosition):Geek.SoulKey{
		if(data == null || data.soul == null){
			return new Geek.SoulKey("none", Geek.MagicType.Wood);
		}
		var key:Geek.SoulKey = new Geek.SoulKey(data.soul.natureProp.style, Geek.GetMagicType(data.soul.natureProp.type));
		return key;
	}
	
	
	private function preloadFoe(level:JsonData.LevelData):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			var loader:EZFoePreloaderTask = TaskManager.Create("view.foe.preloader") as EZFoePreloaderTask;
				
			for(var i:int = 0; i< level.strongholds.Length; ++i){
				var stronghold:JsonData.Stronghold = level.strongholds[i];
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
	public function update(d:float){
		if(isOver_){
			return "next";
		}
	}
	public function over(){
		EZHeroFactories.Release();
			EZMonsterFactories.Release();
	}
	
}