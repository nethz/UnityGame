#pragma strict


class EZNextState extends StateWithEventMap{

	private var gameOver_:boolean;
	private var isOver_:boolean = false;
	
	private var map_:EZGameMapView = null;
	public function EZNextState(map:EZGameMapView){
		map_ = map;
	}
	public function doWild(data:EZStronghold):Task{
		var foeLoader:EZFoeLoaderTask = TaskManager.Create("view.foe.loader") as EZFoeLoaderTask;
		if(data.battle){
			foeLoader.battle = new Geek.SoulKey(data.battle.soul.style, data.battle.soul.type);
		}
		if(data.bag1){
			foeLoader.bag1 = new Geek.SoulKey(data.bag1.soul.style, data.bag1.soul.type);
		}
		if(data.bag2){
			foeLoader.bag2 =new Geek.SoulKey(data.bag2.soul.style, data.bag2.soul.type);
		}
		EZCtrl.index = data.position;
		foeLoader.position = data.position +1;
		TaskManager.PushBack(foeLoader, function(){
			if(data.battle != null){
				EZCtrl.ViewFoeBar(EZSoul.Seat.FoeBattle, 0);
				EZCtrl.ViewHpBar(EZSoul.Seat.FoeBattle);
				EZCtrl.UpdateState(EZSoul.Seat.FoeBattle);
				
			}
			if(data.bag1 != null){
				EZCtrl.ViewFoeBar(EZSoul.Seat.FoeBag1, 0);
				EZCtrl.ViewHpBar(EZSoul.Seat.FoeBag1);
				EZCtrl.UpdateState(EZSoul.Seat.FoeBag1);
			}
			if(data.bag2 != null){
				EZCtrl.ViewFoeBar(EZSoul.Seat.FoeBag2, 0);
				EZCtrl.ViewHpBar(EZSoul.Seat.FoeBag2);
				EZCtrl.UpdateState(EZSoul.Seat.FoeBag2);
			}
		
		});
		return foeLoader;
	}
	
	public function doGameOver(data:EZStronghold):Task{
		var boxLoader:EZFoeLoaderTask = TaskManager.Create("view.foe.loader") as EZFoeLoaderTask;
		boxLoader.battle = new Geek.SoulKey("box", Geek.MagicType.Metal);
		boxLoader.position = data.position +1;
		return boxLoader;
		
		
	}

	public function walkTask(data:EZStronghold):Task{
		var mt:MultiTask = new MultiTask();
		
		var walk:EZWalkTask = TaskManager.instance().factories.createTask("view.player.walk") as EZWalkTask;
		walk.move(map_._mapLength);
		walk.time = map_._mapTime;
		walk.method = map_._runMethod;
		
		var spring:Task = TaskManager.Create("rpg.camera.spring") as Task; 
		mt.push(spring);
		mt.push(map_.runMapTask(walk.time));
		mt.push(walk);
		
		if(data.type == EZStronghold.Type.Wild){
			gameOver_ = false;
			mt.push(doWild(data));
		}else if(data.type == EZStronghold.Type.GameOver){
			gameOver_ = true;
			mt.push(doGameOver(data));
		}
		return mt;
	
	}
	public function start(){
		isOver_ = false;
		
		
		
		var foeNext:EZFoeNextAction = ActionManager.Create("model.foe.next") as EZFoeNextAction;
		ActionManager.Run(foeNext);
		
		var data:EZStronghold = foeNext.data;
		if(data){
			var tl:TaskList = new TaskList();
			tl.push(walkTask(data));
			TaskManager.PushBack(tl, function(){
				isOver_ = true;
			});
			TaskManager.Run(tl);
		}
	}
	
	public function resetHpMp(hp:EZIDSetHpAction, id:int){
			
			hp.id = id;
			hp.hp = 1;  
			hp.ad = 0;  
			hp.max = 1;  
			
			ActionManager.Run(hp);
	
	}
	public function update(d:float){ 
		if(isOver_){ 
			if(gameOver_){
				return "finish.box";
			}else{
				return "walk";
			}
		}
		
		
		return "";
	}
	public function over(){
		
	}
}