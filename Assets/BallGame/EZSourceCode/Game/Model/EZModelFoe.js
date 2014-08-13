#pragma strict

class EZModelFoe extends EZContainer
{

	private var fighter_:EZFighter = null;
	private var isTargeted_:boolean = false;
	
	
	
//	private var drop_:int = -1;
//	private var money_:int = 0;
//	public function get drop():int{
	//	return this.drop_;
//	}
	
//	public function get money():int{
//		return this.money_;
//	}
	
	public function set isTargeted(value:boolean){
		isTargeted_ = value;
	}
	public function get isTargeted():boolean{
		return isTargeted_;
	}
	
	private function createFighter():EZFighter{
		
		var self = this;
		var fighter:EZFighter = new EZFighter();
		fighter.getAttack = function(to:EZSoul.Seat):EZTechnique{
			
			 
			if(this.soul.attack)
			{
				var handler:EZBuffHandler = soul.getBuffHandler();
				handler.refresh();
				if(handler.deposit()){
					var ret:EZTechnique = handler.getTech(
					function():EZTechnique{
						return soul.attack;
					});
					return ret;
				}
				if(this.soul.attackPower != 0){
					var info :EZTechniqueInfo = new EZTechniqueInfo( 
							self.soul.seat,
							to,
							self.soul.attackPower,
							self.soul.baseSpeed,
							self.soul.baseAttack
					);
					var attack:EZTechnique = this.soul.attack.clone(info);
					return attack;
				}
				
			
			}
			return null;	
			
		
		};
		
		
		fighter.getSkill = function(to:EZSoul.Seat):EZTechnique{
			
			if(this.soul.skill)
			{
						
				var handler:EZBuffHandler = soul.getBuffHandler();
				handler.refresh();
				if(handler.deposit()){
					var ret:EZTechnique = handler.getTech(
					function():EZTechnique{
						return soul.skill;
					});
					return ret;
				}
				
				
				
				if(this.soul.skillPower != 0){
					var info :EZTechniqueInfo = new EZTechniqueInfo( 
								self.soul.seat,
								to,
								self.soul.attackPower,
								self.soul.baseSpeed,
								self.soul.baseAttack
					);
				
					var skill:EZTechnique = this.soul.skill.clone(info);
					
					return skill;
				}
			}
			
			return null;
			
		};
		fighter.getMagic = function(to:EZSoul.Seat):EZTechnique{
		
			
			
			if(this.soul.magic)
			{
			
				var handler:EZBuffHandler = soul.getBuffHandler();
				handler.refresh();
				if(handler.deposit()){
					var ret:EZTechnique = handler.getTech(
					function():EZTechnique{
						return soul.magic;
					});
					return ret;
				}
				
			
				if(this.soul.magicPower != 0){
					var info :EZTechniqueInfo = new EZTechniqueInfo( 
							self.soul.seat,
							to,
							self.soul.magicPower,
							self.soul.baseSpeed,
							self.soul.baseAttack
					);
				
					var magic:EZTechnique = this.soul.magic.clone(info);
				
					return magic;
				}
				
			}
			return null;
			
		};
		fighter.getName = function():String{
			return "wild";
		};
		fighter.getSeat = function():EZSoul.Seat{
			return self.seat;
		};
		fighter.thinking = function(){
			var foe:EZFoeInterface = this.soul_.gameObject.GetComponent(EZFoeInterface) as EZFoeInterface;
			if(foe){
				foe.thinking();
			}
		
		};
		fighter.start = function(){
	//		this.soul_.move = false;
		
		};
		fighter.over = function(){
			
			this.soul_.resetAttackPower();
			this.soul_.resetSkillPower();
			soul._round ++;
		};
		
		fighter.alive = function():boolean{
			return this.hasSoul()&& this.soul.alive;
		};
		fighter.getSpeed = function():float{
			return this.soul_.baseSpeed;
		};
		
		fighter.isTargeted = function():boolean{
			return this.isTargeted_;
		};
		
		
		return fighter;
	}
	

	public function get fighter():EZFighter{
		if(fighter_ == null) 
		{
			fighter_ = this.createFighter();	
		}
		return this.fighter_;
	}
	
	

	public function goOut(){
		this.setSoul(null);
	}
	
	public function comeIn(p:EZThePosition){
		if(p.soul){
			this.setSoul(p.soul);
			if(p.soul){
				var info:EZFoeInfo = null;
				info = soul_.gameObject.GetComponent(EZFoeInfo) as EZFoeInfo;
				if(info == null){
					info = soul_.gameObject.AddComponent(EZFoeInfo) as EZFoeInfo;
				}
				info.dropQuality = p.dropQuality;
				info.info = p.info;
				info.pop = p.pop;
				
			
			}
	
		}
	}
	public function getInfo():EZFoeInfo{
		if(this.soul_){
			var info:EZFoeInfo = soul_.gameObject.GetComponent(EZFoeInfo) as EZFoeInfo;
			return info;
		}
		return null;
	
	}
}