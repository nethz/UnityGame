#pragma strict

class EZRPGTest extends MonoBehaviour{
	public var _weBattle:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _weBag1:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _weBag2:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _foeBattle:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _foeBag1:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _foeBag2:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _foe2Battle:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _foe2Bag1:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public var _foe2Bag2:Geek.SoulKey = new Geek.SoulKey("goblin", Geek.MagicType.Wood);
	public function selected(tl:TaskList, id:int, val:boolean){
		 	
			var tt:Task = new Task();
			tt.shutdown = function(){
			 
			 	var seleced:EZIDAction = ActionManager.Create("view.foe.selected") as EZIDAction;
				seleced.id = id;
				ActionManager.Run(seleced);
			
		
			};
			 
			tl.push(tt);
			
			var drop:EZIDDropTask = TaskManager.Create("view.pet.freeing") as EZIDDropTask;
			drop.id = id;
			drop.quality = 1;
			drop.magicType = Geek.MagicType.Water;
			tl.push(drop);
			
			
	}
	public function Start(){
		var tl:TaskList = new TaskList();
		
		 
		var alter:EZIDNumberAction = ActionManager.Create("view.hud.number") as EZIDNumberAction;
		var playerLoader:EZPlayerLoaderTask = TaskManager.Create("view.player.loader") as EZPlayerLoaderTask;
		
		playerLoader.battle = _weBattle;
		playerLoader.bag1 = _weBag1;
		playerLoader.bag2 = _weBag2;
	
		
		var foeLoader:EZFoeLoaderTask = TaskManager.Create("view.foe.loader") as EZFoeLoaderTask;
		//foeLoader.load(_foeBattle, _foeBag1, _foeBag2, 1);
		
		foeLoader.battle = _foeBattle;
		foeLoader.bag1 = _foeBag1;
		foeLoader.bag2 = _foeBag2;
		foeLoader.position = 1;
		
		var loader:EZLoadAction = ActionManager.Create("view.background.loader");
		loader.load("wood");
		
		
		var left:Task = TaskManager.instance().factories.createTask("rpg.camera.left") as Task;
		
		TaskManager.PushFront(left, 
			function(){ 
				ActionManager.Run(loader);
		});
		
		tl.push(playerLoader);
		tl.push(foeLoader);
				
		tl.push(left);
						
		
		
		var walk:EZWalkTask = TaskManager.instance().factories.createTask("view.player.walk") as EZWalkTask;
		walk.move(Vector3(200,0,0));
		walk.time = 3;//(1);
		tl.push(walk);
		
		var wait2:Task = TaskManager.instance().factories.createTask("rpg.camera.right") as Task;
		tl.push(wait2);
		
		var fighting:Task = TaskManager.Create("view.player.fighting") as Task;
		
		
		tl.push(fighting);
		
		var inTask:Task = TaskManager.Create("rpg.camera.in") as Task;
		
		TaskManager.PushBack(inTask, function(){
			var action:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
			for(var i:int = 0; i<6; ++i){
				action.id = i;
				action.msg = "weakup";
				ActionManager.Run(action);
				ActionManager.Run("view.input.enable");
			}
		});
		
		
		tl.push(inTask);
		
		for(var id:int = 0; id<6; ++id){
			var attack:EZIDTask = TaskManager.Create("view.pet.attack") as EZIDTask;
			attack.id = id;
			tl.push(attack);
			selected(tl, id, true);
		}
		
		var collect:Task = TaskManager.Create("view.foe.collect")as Task;
		tl.push(collect);
		
		
		for(var ii:int = 0; ii < 6; ++ii){
			var action:EZIDHurtTask = TaskManager.Create("view.pet.hurt") as EZIDHurtTask;
			action.id = ii;
			
		 
			selected(tl, ii, false);
			tl.push(action);
			
		
		}
		
		
		
		var wa:EZWaitTask = new EZWaitTask();
		wa.setAllTime(0);
		
		TaskManager.PushFront(wa, function(){
		//	var th2:EZIDTask = TaskManager.Create("view.pet.touch") as EZIDTask;
		//	th2.id = 1; 
		//	TaskManager.Run(th2);
		});
		TaskManager.PushBack(wa, function(){
			var th:EZIDTask = TaskManager.Create("view.pet.out") as EZIDTask;
			th.id = 1; 
			TaskManager.Run(th);
		});
		
		tl.push(wa);
		for(var i:int = 0; i<6; ++i){
		//	var touch:EZIDTask = TaskManager.Create("view.pet.touch") as EZIDTask;
		//	touch.id = i;
		//	tl.push(touch);
			
		
		
			var ot:EZIDTask = TaskManager.Create("view.pet.out") as EZIDTask;
			ot.id = i;
			tl.push(ot);
		
		}
		
		
		var swap1:EZIDTask = TaskManager.Create("view.swap") as EZIDTask;
		swap1.id = 1;
		tl.push(swap1);
		
		var swap2 = TaskManager.Create("view.swap") as EZIDTask;
		swap2.id = 2;
		tl.push(swap2);
		
		
		var swap4:EZIDTask = TaskManager.Create("view.swap") as EZIDTask;
		swap4.id = 4;
		tl.push(swap4);
		
		
		var swap5 = TaskManager.Create("view.swap") as EZIDTask;
		swap5.id = 5;
		tl.push(swap5);
		
		
		var setMp:EZIDMagicBarAction = ActionManager.Create("view.hud.mp") as EZIDMagicBarAction;
		var setHp:EZIDSetHpAction = ActionManager.Create("view.hud.hp") as EZIDSetHpAction;
		var mpTask:EZWaitTask = new EZWaitTask();
		mpTask.setAllTime(5);
		TaskManager.PushFront(mpTask, function(){
			 
			for(var iii:int = 0; iii< 6; ++iii){
					
				alter.id =iii;
				alter.color = EZHudNumber.EzColor.Red;
				alter.from = 10;
				alter.to = 10;
				ActionManager.Run(alter);
			}
			setMp.id = 5;
			setMp.val = 5;
			setMp.all = 10;
			ActionManager.Run(setMp); 
			
		
			
			setMp.id = 1;
			setMp.val = 5;
			setMp.all = 10;
			ActionManager.Run(setMp);
			setMp.id = 3;
			setMp.val = 5;
			setMp.all = 10;
			ActionManager.Run(setMp);
			setMp.id = 0;
			setMp.val = 5;
			setMp.all = 10;
			ActionManager.Run(setMp);
			
			
			setHp.id = 5;
			setHp.hp = 1;
			setHp.ad = 0;
			setHp.max = 1;
			ActionManager.Run(setHp);
			setHp.id = 1;
			setHp.hp = 1;
			setHp.ad = 0;
			setHp.max = 1;
			ActionManager.Run(setHp);
			setHp.id = 3;
			setHp.hp = 1;
			setHp.ad = 0;
			setHp.max = 1;
			ActionManager.Run(setHp);
			setHp.id = 0;
			setHp.hp = 1;
			setHp.ad = 0;
			setHp.max = 1;
			ActionManager.Run(setHp);
		
		});
		
		tl.push(mpTask);
		
		
		
		var popTask:EZWaitTask = new EZWaitTask();
		popTask.setAllTime(2);
		
	
		
		tl.push(popTask);
	
		
		var outc:Task = TaskManager.instance().factories.createTask("rpg.camera.out") as Task;
		TaskManager.PushFront(outc, function(){
		
			ActionManager.Run("view.input.disable");
			var action:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
			for(var i:int = 0; i<6; ++i){
				action.id = i;
				action.msg = "sleep";
				ActionManager.Run(action);
			}
		});
		
		
		
		var foe2Loader:EZFoeLoaderTask = TaskManager.Create("view.foe.loader") as EZFoeLoaderTask;
		//foe2Loader.load(_foe2Battle, _foe2Bag1, _foe2Bag2, 2);
		
		
		
		foe2Loader.battle = _foe2Battle;
		foe2Loader.bag1 = _foe2Bag1;
		foe2Loader.bag2 = _foe2Bag2;
		foe2Loader.position = 2;
		
		
		TaskManager.PushBack(outc, 
			function(){
				TaskManager.Run(foe2Loader);
		});
		
		tl.push(outc);
		
		
		var peace:Task = TaskManager.instance().factories.createTask("rpg.player.peace") as Task;
		tl.push(peace);
		
		
		var walk2:EZWalkTask = TaskManager.instance().factories.createTask("view.player.walk") as EZWalkTask;
		walk2.move(Vector3(400,0,0));
		walk2.time = 3;//(1);
		tl.push(walk2); 
		
	
		
			
			
		var wtl:TaskList = new TaskList();
		var wait4:EZWaitTask = new EZWaitTask();
		wait4.setAllTime(0.2);
		wtl.push(wait4);
		var provoke:EZIDTask = TaskManager.Create("view.pet.win") as EZIDTask;
		provoke.id = EZSoul.Seat.FoeBattle;
		TaskManager.PushFront(provoke, function(){
			var weakup:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
			weakup.id =  EZSoul.Seat.FoeBattle;
			weakup.msg = "weakup";
			ActionManager.Run(weakup);
		});
		var mt4:MultiTask = new MultiTask();
		var wait3:Task = TaskManager.instance().factories.createTask("rpg.camera.reward") as Task;
		wtl.push(provoke);
		mt4.push(wtl);
		mt4.push(wait3);
		tl.push(mt4);
		TaskManager.Run(tl);
		
		
	}

};