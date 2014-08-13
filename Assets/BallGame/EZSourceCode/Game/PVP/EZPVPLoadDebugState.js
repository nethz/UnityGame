#pragma strict


class EZPVPLoadDebugState extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var loader_:EZPVPLoader = null;
	public function EZPVPLoadDebugState(loader:EZPVPLoader/*,  dialog:EZGameDialogView,  map:EZGameMapView, context:EZModelContext*/){
		loader_ = loader;
		
	}
	
	public function start(){
	

		_start();
	
	
	}
	private function loadPlayer(loader:EZPlayerLoaderTask, data:JsonData.Hero):Task{
		 
		loader.player = data.avatar;
		Debug.LogWarning("avatar"+data.avatar);
		if(data.battle){
			loader.battle = new Geek.SoulKey(data.battle.natureProp.style, Geek.GetMagicType(data.battle.natureProp.type));
		}
		if(data.bag1){
			loader.bag1 = new Geek.SoulKey(data.bag1.natureProp.style, Geek.GetMagicType(data.bag1.natureProp.type));
		}
		if(data.bag2){
			loader.bag2 =new Geek.SoulKey(data.bag2.natureProp.style, Geek.GetMagicType(data.bag2.natureProp.type));
		}
		
		
		return loader;
		
	}
	private function _start(){	
	
		Debug.LogWarning("pvp_C");
		var tl:TaskList = new TaskList();
		isOver_ = false;
		var we:JsonData.Hero = null; 
		var foe:JsonData.Hero = null; 
		
		we = loader_.loadWe();
		foe = loader_.loadFoe();
		Debug.LogWarning("foe+"+foe.avatar);
		var loader:EZLoadAction = ActionManager.Create("view.background.loader");
		loader.load(loader_.sceneName);
		
		ActionManager.Run(loader);
		
		var heroLoader:EZHeroLoaderAction = ActionManager.Create("model.hero.loader") as EZHeroLoaderAction;
		heroLoader.load(we);
		ActionManager.Run(heroLoader);
		
		
		var rivalLoader:EZHeroLoaderAction = ActionManager.Create("model.rival.loader") as EZHeroLoaderAction;
		rivalLoader.load(foe);
		ActionManager.Run(rivalLoader);
		
		var tt:TaskList = new TaskList();
	
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;
		tt.push(loaded);
		
		var begin:Task = TaskManager.Create("rpg.camera.begin") as Task; 
		tt.push(begin);
		tl.push(loadPlayer(TaskManager.Create("view.player.loader") as EZPlayerLoaderTask, we));
		tl.push(loadPlayer(TaskManager.Create("view.rival.loader") as EZPlayerLoaderTask, foe));
		tl.push(tt);
		
		TaskManager.PushBack(tl, 
			function(){
			
				EZCtrl.ViewHpBar(EZSoul.Seat.WeBattle);
				EZCtrl.ViewSkillBar(EZSoul.Seat.WeBattle, false);
				if(we.bag1){
					EZCtrl.ViewMagicBar(EZSoul.Seat.WeBag1, 0);
					EZCtrl.ViewHpBar(EZSoul.Seat.WeBag1);
				}
				if(we.bag2){
					EZCtrl.ViewMagicBar(EZSoul.Seat.WeBag2, 0);
					EZCtrl.ViewHpBar(EZSoul.Seat.WeBag2);
				}
			
			
			
				EZCtrl.ViewHpBar(EZSoul.Seat.FoeBattle);
				EZCtrl.ViewSkillBar(EZSoul.Seat.FoeBattle, false);
				if(foe.bag1){
					EZCtrl.ViewMagicBar(EZSoul.Seat.FoeBag1, 0);
					EZCtrl.ViewHpBar(EZSoul.Seat.FoeBag1);
				}
				if(foe.bag2){
					EZCtrl.ViewMagicBar(EZSoul.Seat.FoeBag2, 0);
					EZCtrl.ViewHpBar(EZSoul.Seat.FoeBag2);
				}
			
		
				isOver_ = true;
		});
		
		
		TaskManager.Run(tl);
		
		
	
	}

	public function update(d:float){
		if(isOver_){
			Debug.LogWarning("go ready!");
			return "ready";
		}
	}
	
	public function over(){
	
		EZHeroFactories.Release();
		EZMonsterFactories.Release();
	}
	
}