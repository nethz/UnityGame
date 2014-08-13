#pragma strict

class EZAttackHandler{ 
	public class AttackResult{
		public var physics:float = 0;
		public var magic:float = 0;
		public var attack:float = 0;
		public var hurt:float = 0;
		public var blood:float = 0;
		public var vampire:float = 0;
		public var to:EZSoul = null; 
		public var from:EZSoul = null; 
		public var size:EZHudNumber.Size = EZHudNumber.Size.Small;
		public function elements():float{
			if(from == null || to == null){
				return 1f;
			}
			if(Geek.Neutralize(from.type, to.type)){
				return 1.5f;
			}else if(Geek.Reinforce(from.type, to.type)){
				return 0.66666f;
			} 
			return 1f;
		};
		public function original(number:float):float{
			return number/this.elements();
		}
	};
	public static function DoBlood(from:EZSoul.Seat, id:int):Task{
		var task:EZOverTask = new EZOverTask();
		var hurt:EZIDHurtTask = null;
		task.init = function(){
			task.over = false;
			if(EZAttackHandler.blood_){
				EZAttackHandler.blood_ = false;
				EZAttackHandler.attackN_[id]++;
				var tl:TaskList = new TaskList();
				if(EZAttackHandler.attackN_[id] == EZAttackHandler.attackCount_[id]){
					var w:EZWaitTask = new EZWaitTask();
					w.setAllTime(0.1f);
					tl.push(w);
					hurt = TaskManager.Create("view.pet.hurt") as EZIDHurtTask;
				}else{
					hurt = TaskManager.Create("view.pet.hurting") as EZIDHurtTask;
					//hurt = TaskManager.Create("view.pet.hurt") as EZIDHurtTask;
				}
				hurt.hurtType = EZHud.EffectType.Blood;
				hurt.attackSeat = from;
				hurt.id = id;
				tl.push(hurt);
				TaskManager.PushBack(tl, function(){
					task.over = true;
				});
				TaskManager.Run(tl);
			}else{
				task.over = true;
			}
		};
		return task;
	}
	

	public static function AttackPlanning(data:EZTechDataValue, from:EZSoul.Seat, to:EZSoul.Seat):AttackResult{
		var ret:AttackResult = new AttackResult();
		ret.physics = data.physics(to);
		ret.magic = data.magic(to);
		
		if(from != EZSoul.Seat.None){
			ret.from = EZContainerManager.GetSoul(from) as EZSoul;
			var fromHandler:EZBuffHandler = ret.from.getBuffHandler();
			fromHandler.refresh(); 
			if(!data.blockPhysics){
				ret.physics = fromHandler.hurting(ret.physics);
			}
			ret.magic = fromHandler.hurting(ret.magic);
		}
		
		
		if(data.blockPhysics){
			ret.attack =  ret.magic;
		}else{
			ret.attack = (ret.physics + ret.magic);
		}
		ret.to = EZContainerManager.GetSoul(to) as EZSoul;
		
		var toHandler:EZBuffHandler = ret.to.getBuffHandler();
		
		toHandler.refresh(); 
		
	
		ret.attack = toHandler.hurted(ret.attack);
		ret.physics = toHandler.hurted(ret.physics);
		
		if(data.blockPhysics && ret.attack == 0){
			return ret;
		}
		
		if(ret.attack < 1){
			ret.attack = 1;
		}
		else{
			ret.attack = Mathf.Round(ret.attack);
		}
	
		ret.blood = toHandler.blood();
		if(data.puncture){
			ret.hurt = ret.attack + ret.blood;
		}else{
			ret.hurt = toHandler.shielding(ret.attack + ret.blood);
		}
	
		if(EZTarget.IsWe(from)){
		
			if(data.power >= 23){
				ret.size = EZHudNumber.Size.Great;
			}else if(data.power >= 18){
				ret.size = EZHudNumber.Size.Large;
			}else if(data.power >= 12){
				ret.size = EZHudNumber.Size.Big;
			}else if(data.power >= 6){
				ret.size = EZHudNumber.Size.Middle;
			}
		}else{
			var p:float = (ret.attack + ret.blood) / ret.to.baseMaxHealth;
			if(p > 0.5f){
				ret.size = EZHudNumber.Size.Great;
			}else if(p > 0.3f){
				ret.size = EZHudNumber.Size.Large;
			}else if(p > 0.2f){
				ret.size = EZHudNumber.Size.Big;
			}else if(data.power > 0.1f){
				ret.size = EZHudNumber.Size.Middle;
			}
		}
		if(ret.hurt > ret.to.health){
			ret.hurt = ret.to.health;
		}
		ret.vampire = ret.physics < ret.hurt ? ret.physics : ret.hurt;
		
		return ret;
		
	}
	private static function DoHurt(from:EZSoul.Seat, id:int, isDot:boolean):Task{
		var task:EZOverTask = new EZOverTask();
		var hurt:EZIDHurtTask = null;
		task.init = function(){
			EZAttackHandler.attackN_[id]++;
			if(EZAttackHandler.attackN_[id] == EZAttackHandler.attackCount_[id]){
				hurt = TaskManager.Create("view.pet.hurt") as EZIDHurtTask;
			}else{
				hurt = TaskManager.Create("view.pet.hurting") as EZIDHurtTask;
				//hurt = TaskManager.Create("view.pet.hurt") as EZIDHurtTask;
			}
			if(isDot){
				hurt.hurtType = EZHud.EffectType.Dot;
			}else{
				hurt.hurtType = EZHud.EffectType.Attack;
			}
			hurt.attackSeat = from;
			hurt.id = id;
			TaskManager.PushBack(hurt, function(){
				task.over = true;
			});
			TaskManager.Run(hurt);
		};
		return task;
			
	}
	private static var attackCount_:int[] = new int[6];
	private static var attackN_:int[] = new int[6];
	private static var blood_:boolean = false;
	public static function Reset(){
		for(var i:int = 0; i<attackCount_.Length; ++i){
			attackCount_[i] = 0;
		}
		for(var j:int = 0; j<attackN_.Length; ++j){
			attackN_[j] = 0;
		}
		//EZAttackHandler.attackCount_ = 0;
		//EZAttackHandler.attackN_ = 0;
		EZAttackHandler.blood_ = false;
	}
	public static function DoAttack(data:EZTechDataValue, from:EZSoul.Seat, to:EZSoul.Seat, isDot:boolean):Task{
			EZAttackHandler.attackCount_[to] ++;
			var tl:TaskList = new TaskList();
			var toId:EZView.Seat = EZToolkits.ModelSeatToViewID(to);
			var toSoul:EZSoul = EZContainerManager.GetSoul(to);
	
			var task:Task = EZAttackHandler.DoHurt(from, toId, isDot);
			
			var ret:AttackResult = null;
			var fake:EZFakeSoul = null;
			var buffHandler:EZBuffHandler = null;
			var dotHandler:EZDotHandler = null;
			var fromBuffHandler:EZBuffHandler = null;
			var fromDotHandler:EZDotHandler = null;
			
			
			TaskManager.PushFront(task, function(){
			
				ret = EZAttackHandler.AttackPlanning(data, from, to);
				
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
				
				
				if(ret.blood != 0){
					EZAttackHandler.attackCount_[to]++;
					EZAttackHandler.blood_ = true;
					EZCtrl.ViewHpBar(new EZAttackFakeSoul(ret),  -ret.original(ret.attack), -ret.attack, ret.size);
				}else{
					fake = new EZHurtFakeSoul(ret);
					EZCtrl.ViewHpBar(fake, -ret.original(ret.attack), -ret.attack, ret.size);
				}
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
				
				
				
				if(ret.blood != 0){
					
					fake = new EZHurtFakeSoul(ret);
					EZCtrl.ViewHpBar(fake, ret.original(-ret.blood), -ret.blood, EZHudNumber.Size.Middle);
				}
				
				if(!data.puncture){
					buffHandler.shielded(ret.attack + ret.blood);
				}
	
				
				fake.execute();
				data.doActioned(to);
				
			});
			 
			 
			tl.push(task);
		
		
			tl.push(DoBlood(from, toId));
			
			
		
			return tl;
		
	}
}