#pragma strict

class EZBindSoul{
	
	public var _baseAttack:Function;
	public var _baseMaxHealth:Function;
	public var _baseSpeed:Function;
	public var _skill:Function;
	public var _magic:Function;
	public var _magicMaxPower:Function;
	public var _hurting:Function;
	public var _hurted:Function;
	
	
	
	
	public function get baseAttack():float{  
		if(_baseAttack){
			var ret:float = _baseAttack();
			return ret;
		}
		return 0; 
	}  
	 	
	public function get baseMaxHealth():float{ 
		if(_baseMaxHealth){
			var ret:float = _baseMaxHealth();
			return ret;
		}
		return 0f; 
	}  
	
	
 	public function get baseSpeed():float{  
		if(_baseSpeed){
			var ret:float = _baseSpeed();
			return ret;
		}
		return 0;
	}
	
	
	public function get skill():EZTechnique{
		if(_skill){
			var ret:EZTechnique = _skill() as EZTechnique;
			return ret;
		}
		return null; 
	}
	
	public function get magic():EZTechnique{ 
		if(_magic){
			var ret:EZTechnique = _magic() as EZTechnique;
			return ret;
		} 
		return null; 
	}  
	
	public function get magicMaxPower():float{
		if(_magicMaxPower){
			var ret:float = _magicMaxPower();
			return ret;
		}
		return 1f; 
	}  
	
	
	
	public function hurting(hurt:float):float{
		
		if(_hurting){
			var ret:float = _hurting(hurt);
			return ret;
		}
		return 1f; 
	}
	
	
	public function hurted(hurt:float):float{
		if(_hurted){
			var ret:float = _hurted(hurt);
			return ret;
		}
		return 1f; 
	}
}