#pragma strict
class EZModelBag  extends EZContainer{

	
	private var fighter_:EZFighter = null;
	private var useMagic_:boolean = false;
	//private var store_:EZMagicStore = null;
	
	
	public function Awake(){ 
		super.Awake();
		
		
	}
	private function createFighter():EZFighter{
		
		var self = this;
		var fighter:EZFighter = new EZFighter();
		fighter.getAttack = function(to:EZSoul.Seat):EZTechnique{
			return null;
		};
		
		
		fighter.getSkill = function(to:EZSoul.Seat):EZTechnique{
			return null;
		};
		fighter.getMagic = function(to:EZSoul.Seat):EZTechnique{
			
			var handler:EZBuffHandler = soul.getBuffHandler();
			
			handler.refresh();
			if(handler.deposit()){
				var ret:EZTechnique = handler.getTech(
				function():EZTechnique{
					return soul.magic;
				});
				return ret;
			}
			if(useMagic_){
				//soul.move = true;
				var info :EZTechniqueInfo = new EZTechniqueInfo( 
						
						soul.seat,
						to,
						soul.magicMaxPower,
						soul.baseSpeed,
						soul.baseAttack
					);
				var magic:EZTechnique = soul.magic.clone(info);
				useMagic_ = false;
				return magic;
			}
			return null;
		};
		fighter.getName = function():String{
			return "bag";
		};
		fighter.getSeat = function():EZSoul.Seat{
			return self.seat;
		};
		fighter.start = function(){
		};
		fighter.over = function(){
			
			self.soul.resetAttackPower();
			self.soul.resetSkillPower();
			soul._round ++;
		};
		
		fighter.alive = function():boolean{
			return this.hasSoul() && this.soul.alive;
		};
		fighter.getSpeed = function():float{
			return self.soul_.baseSpeed;
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
	
	public function doMagic(){
		useMagic_ = true;
	}
	
	public function canMagic():boolean{
		var handler:EZBuffHandler = soul.getBuffHandler();
		handler.refresh();
		if(handler.ignore()|| handler.deposit()){
			return false;
		}
		
		
		
		if(soul && soul.magicBar >= 1){
			return true;
		} 
		return false;
	}
	


}
