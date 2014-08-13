#pragma strict
class EZModelBattle extends EZContainer{

	  
	
	private var fighter_:EZFighter = null;
	var useCrystal_:boolean = false;
	private function createFighter():EZFighter{
		
		var fighter:EZFighter = new EZFighter();
		
		
		fighter.getCrystal = function(to:EZSoul.Seat):EZTechnique{
			
			
			if(!useCrystal_){
				return null;
			}
			var crystal:EZModelCrystal = EZContainerManager.GetCrystal();
			if(crystal == null){
				return null;
			}
			
			var info :EZTechniqueInfo = new EZTechniqueInfo( 
				this.soul.seat,
				to,
				1,
				this.soul.baseSpeed,
				this.soul.baseAttack
			);
			
			var tech:EZTechnique = crystal.technique.clone(info);
			
			Debug.LogWarning("use crystal! ~~~~");
			return tech;
		};
		
		
		
		fighter.getAttack = function(to:EZSoul.Seat):EZTechnique{
			
		
			
			//soul.move = true;
			var info :EZTechniqueInfo = new EZTechniqueInfo( 
							this.soul.seat,
							to,
							this.soul.attackPower,
							this.soul.baseSpeed,
							this.soul.baseAttack
			);
			var attack:EZTechnique = this.soul.attack.clone(info);
			return attack;
		};
		
		
		fighter.getSkill = function(to:EZSoul.Seat):EZTechnique{
		
		
	
			
			//soul.move = true;
				
			if(soul && soul.skill)
			{
				if(soul.skillPower > 0)
				{
					var info :EZTechniqueInfo = new EZTechniqueInfo( 
							soul.seat,
							to,
							soul.attackPower,
							soul.baseSpeed,
							soul.baseAttack
						);
					var skill:EZTechnique = this.soul.skill.clone(info);
					return skill;
				}
				
			}
			return null;
		};
		fighter.getMagic = function(to:EZSoul.Seat):EZTechnique{
			return null;
		};
		fighter.getName = function(to:EZSoul.Seat):String{
			return "battle";
		};
		fighter.getSeat = function():EZSoul.Seat{
			return this.seat;
		};
		fighter.start = function(){
			//this.soul.move = false;
		};
		fighter.over = function(){
			
			this.soul.resetAttackPower();
			this.soul.resetSkillPower();
			soul._round ++;
			useCrystal_ = false;
		};
		
		fighter.alive = function():boolean{
			return this.hasSoul() && this.soul.alive;
		};
		fighter.getSpeed = function():float{ 
			if(this.useCrystal_){
				return this.soul_.baseSpeed + 10000;
			}else{
				 return this.soul_.baseSpeed;
			}
			
		};
		
		fighter.isTargeted = function():boolean{
			return false;
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
	public function doCrystal(){
		this.useCrystal_ = true;
		Debug.Log(this.useCrystal_);
	
	}

	
}
