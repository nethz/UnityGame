#pragma strict
class EZTechniqueHandler{
	private static function Miss(seat:EZSoul.Seat):Task{
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.5);
		TaskManager.PushFront(wait, function(){
			var action:EZIDAction = ActionManager.Create("view.hud.miss") as EZIDAction;
			Debug.Log("soul++" + seat);
			action.id = seat;
			ActionManager.Run(action);
		});
		return wait;
	}
	public static function DoAffixOneTime(mt:MultiTask, data:EZTechData, from:EZSoul.Seat, to:EZSoul.Seat, isDot:boolean){
	 	var targets:EZSoul.Seat[] = EZAffixTarget.GetTargetSeat(data.target, from, to);
	 	
		for(var i:int = 0; i<targets.Length; ++i){
			var seat:EZSoul.Seat = targets[i];
			Debug.Log("" + seat + to + data.target);
			var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul; 
			if(!soul || (!soul.alive && data.type != "revive")){
				
				if(soul && data.type != "medical"){
					mt.push(EZTechniqueHandler.Miss(seat));
				}
				continue;
			}
			data.doActioning(seat);
			var task:Task = null;
			switch(data.type){
			case "attack": 
				mt.push(EZAttackHandler.DoAttack(data as EZTechDataValue, from, seat, isDot));
				break;
			case "bind":
				mt.push(DoBind(data as EZTechDataBind, from, seat));
				break;
			case "medical":
				mt.push(DoMedical(data as EZTechDataValue, from, seat));
				break;
			case "revive":
				Debug.Log("revive");
				mt.push(DoRevive(data as EZTechDataRevive, from, seat));
				break;
			}
		} 
	}
	
	
	public static function DoDot(tl:TaskList, data:EZTechData, from:EZSoul.Seat, to:EZSoul.Seat){
		
		DoAffix(tl, data, from, to, true);
	}
	public static function PVPDoDot(tl:TaskList, data:EZTechData, from:EZSoul.Seat, to:EZSoul.Seat){
		DoAffix(tl, data, from, to, true);
		tl.push(HeroDie());
		tl.push(RivalDie());
	}
	public static function DoAffix(tl:TaskList, data:EZTechData, from:EZSoul.Seat, to:EZSoul.Seat, isDot:boolean){ 
		
		var times:int = data.times();
		var previous:EZTechData = data.previous;
		if(previous){
			DoAffix(tl, previous, from, to, isDot);
		}
		var manager:EZBuffManager = EZBuffManager.GetInstance();
		for(var n:int = 0; n <times; ++n){ 
			var mt:MultiTask = new MultiTask(); 
			
			
			DoAffixOneTime(mt, data, from, to, isDot); 
			
			
			var besides:EZTechData = data.besides;
			if(besides){
				var tl2:TaskList = new TaskList();
				DoAffix(tl2, besides, from, to, isDot);
				mt.push(tl2);
			}
			
			TaskManager.PushBack(mt, function(){
				manager.refresh();
				EZCtrl.BuffFlicker(manager.doActioned());
				var close:Array = manager.doClose();
				EZCtrl.BuffClose(close);
			});
			tl.push(mt);
		}
		
		var next:EZTechData = data.next;
		if(next){
			DoAffix(tl, next, from, to, isDot);
		}
		
	}
	public static function HeroDie():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init =function(){
			isOver = false;
			var tl:TaskList = new TaskList();
			
			for(var n:int = 0; n<3; ++n){
				var weSoul:EZSoul = EZContainerManager.GetSoul(n) as EZSoul; 
				weSoul.castrate();
				if(!weSoul.alive){
					var freeing:EZIDDropTask = TaskManager.Create("view.pet.freeing") as EZIDDropTask;
					freeing.id = n;
					freeing.quality = weSoul.baseQuality;
					freeing.magicType = weSoul.type;
					tl.push(freeing);
				}
			
			}
			
			TaskManager.PushBack(tl, function(){isOver = true;});
			TaskManager.Run(tl);
		};
		task.isOver = function(){
			return isOver;
		};
		
		return task;
	}
	public static function WildDie():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init =function(){
			isOver = false;
			var tl:TaskList = new TaskList();
			
			
			for(var i:int = 3; i<6; ++i){
				var soul:EZSoul = EZContainerManager.GetSoul(i) as EZSoul; 
				soul.castrate();
				if(!soul.alive){
					var action:EZIDDropDataAction = ActionManager.Create("model.foe.drop") as EZIDDropDataAction;
					action.id = i;
					ActionManager.Run(action);
					
					if(action.dropQuality == -1){
						var die:EZIDTask = TaskManager.Create("view.pet.die") as EZIDTask;
						die.id = i;
						tl.push(die);
					}else{
						
						var drop:EZIDDropTask = TaskManager.Create("view.pet.freeing") as EZIDDropTask;
						drop.id = i;
						drop.quality = action.dropQuality;
						drop.magicType = soul.type;
						tl.push(drop);
					}
				
					
					
				}
			
			}
			TaskManager.PushBack(tl, function(){isOver = true;});
			TaskManager.Run(tl);
		};
		task.isOver = function(){
			return isOver;
		};
		
		return task;
	}
	public static function RivalDie():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init =function(){
			isOver = false;
			var tl:TaskList = new TaskList();
			
			for(var n:int = 3; n<6; ++n){
				var weSoul:EZSoul = EZContainerManager.GetSoul(n) as EZSoul; 
				weSoul.castrate();
				if(!weSoul.alive){
					var freeing:EZIDDropTask = TaskManager.Create("view.pet.freeing") as EZIDDropTask;
					freeing.id = n;
					freeing.quality = weSoul.baseQuality;
					freeing.magicType = weSoul.type;
					tl.push(freeing);
				}
			
			}
			
			
			
			
			TaskManager.PushBack(tl, function(){isOver = true;});
			TaskManager.Run(tl);
		};
		task.isOver = function(){
			return isOver;
		};
		
		return task;
	}
	
	
	public static function DoTechnique(tl:TaskList, technique:EZTechniqueData, otherDie:Task){
		
		var data:EZTechDataRoot = technique.data;
		
		DoAffix(tl, data, technique.from, technique.to, false);
		
		var hero:Task = HeroDie();
		tl.push(hero);
		TaskManager.PushBack(otherDie, function(){
			EZCtrl.Flicker(technique.data);
		});
		tl.push(otherDie);
	}
	/*
	public static function PVPDoTechnique(tl:TaskList, technique:EZTechniqueData){
		var data:EZTechDataRoot = technique.data;
		
		DoAffix(tl, data, technique.from, technique.to);
		
		var hero:Task = HeroDie();
		tl.push(hero);
		var rival:Task = ();
		TaskManager.PushBack(rival, function(){
			EZCtrl.Flicker(technique.data);
		});
		tl.push(rival);
	}*/
	
	public class MedicalResult{
		public var physics:float = 0;
		public var magic:float = 0;
		public var medical:float = 0;
		public var repair:float = 0;
		public var feedback:float = 0;
		public var to:EZSoul = null; 
		public var from:EZSoul = null; 
		public function elements():float{
			if(from == null || to == null){
				return 1f;
			}
			/*
			if(Geek.Neutralize(from.type, to.type)){
				return 0.5f;
			}else if(Geek.Reinforce(from.type, to.type)){
				return 1.5f;
			} 
			*/
			return 1f;
		};
		public function original(number:float):float{
			return number/this.elements();
		}
	};
	
	public static function MedicalPlanning(data:EZTechDataValue, from:EZSoul.Seat, to:EZSoul.Seat):MedicalResult{
		var ret:MedicalResult = new MedicalResult();
		ret.physics = data.physics(to);
		ret.magic = data.magic(to);
		
		if(from != EZSoul.Seat.None){
			ret.from = EZContainerManager.GetSoul(from) as EZSoul;
		}
		
		ret.to = EZContainerManager.GetSoul(to) as EZSoul;
		if(data.blockPhysics){
			ret.medical =  ret.magic;
		}else{
			ret.medical = (ret.physics + ret.magic);
		}
		if(data.blockPhysics && ret.medical == 0){
			return ret;
		}
		
		ret.medical = Mathf.Round(ret.medical);
	
		
		if(ret.repair + ret.to.health > ret.to.baseMaxHealth){
			ret.repair = ret.to.baseMaxHealth - ret.to.health;
		}else{
			ret.repair = ret.medical;
		}
		
		ret.feedback = ret.medical;
		return ret;
	}
	
	public static function DoMedicalEffect(seat:EZSoul.Seat){
			var effectAction:EZAttackEffectAction = ActionManager.Create("view.hud.effect") as EZAttackEffectAction; 
			effectAction.type = EZHud.EffectType.Medical;
			effectAction.id = seat;
			ActionManager.Run(effectAction);
	}
	public static function DoMedical(data:EZTechDataValue, from:EZSoul.Seat, to:EZSoul.Seat):Task{
		
			
			
			var task:EZIDHurtTask = TaskManager.Create("view.pet.hurt") as EZIDHurtTask;//new EZWaitTask();
			task.hurtType = EZHud.EffectType.Medical;
			task.attackSeat = from;
			task.id = to;
			//task.setAllTime(0.5);
			var medical:float = 0; 
			var toId:EZView.Seat = EZToolkits.ModelSeatToViewID(to);
			var ret:EZTechniqueHandler.MedicalResult = null;
			var fake:EZFakeSoul = null;
			
			var buffHandler:EZBuffHandler = null;
			var dotHandler:EZDotHandler = null;
			var fromBuffHandler:EZBuffHandler = null;
			var fromDotHandler:EZDotHandler = null;
			
			TaskManager.PushFront(task, function(){
				
				
				ret = EZTechniqueHandler.MedicalPlanning(data, from, to);
						
				buffHandler = ret.to.getBuffHandler();
				dotHandler = ret.to.getDotHandler();
				
				if(ret.from){
					fromBuffHandler = ret.from.getBuffHandler();
					fromDotHandler = ret.from.getDotHandler();
					EZCtrl.BuffFlicker(fromBuffHandler.flickerIt());
					EZCtrl.DotFlicker(fromDotHandler.flickerIt());
				}
				
				EZCtrl.BuffFlicker(buffHandler.flickerIt());
				EZCtrl.DotFlicker(dotHandler.flickerIt());
				
				
				fake = new EZRepairFakeSoul(ret);
				EZCtrl.ViewHpBar(fake, ret.original(ret.medical), ret.medical, EZHudNumber.Size.Small);
				DoMedicalEffect(to);
			
			}); 
			TaskManager.PushBack(task, function(){
				
				buffHandler.refresh(); 
				dotHandler.refresh(); 
				
				
				EZCtrl.DotClose(dotHandler.doClose());
				EZCtrl.BuffClose(buffHandler.doClose());
				
				
				if(ret.from){
					
					EZCtrl.DotClose(fromDotHandler.flickerIt());
					EZCtrl.BuffClose(fromBuffHandler.flickerIt());
				}
				
				fake.execute();
				data.doActioned(to);
			});
			
			
			 
			 
			
			return task;
	}
	public static function DoRevive(data:EZTechDataRevive, from:EZSoul.Seat, to:EZSoul.Seat):Task{
		var soul = EZContainerManager.GetSoul(to) as EZSoul;
		Debug.Log(from + "->" + to);
		var toId:EZView.Seat = EZToolkits.ModelSeatToViewID(to);
		if(!soul.alive){
		Debug.Log(from + "->" + to);
			soul.revive(0.4321f);
			var task:EZIDTask = TaskManager.Create("view.pet.revive") as EZIDTask;
			task.id = toId;
			var health:float = 0;
			TaskManager.PushFront(task, function(){
				health = data.health(to);
			});
			
			TaskManager.PushBack(task, function(){
			
				soul.health = health;
				EZCtrl.ViewHpBar(to);
				EZCtrl.ViewMagicBar(to, 0);
				data.doActioned(to);
			});	
			
			
			return task;
		}else{
			return new Task();
		}
	}
	public static function DoBind(data:EZTechDataBind, from:EZSoul.Seat, to:EZSoul.Seat):Task{
		var task:Task = new Task(); 
		TaskManager.PushBack(task, function(){
			var soul = EZContainerManager.GetSoul(to) as EZSoul;
			var bind:EZBind = data.binding(to) as EZBind;
			EZCtrl.CreateBindAction(bind);
			var fake:EZFakeSoul = new EZFakeSoul(soul);
			EZCtrl.ViewHpBar(fake);
			
			
			data.doActioned(to);
			
		});
		return task;
	}
	

};