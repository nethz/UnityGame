#pragma strict

class EZSoulBase extends EZSoul{

	

	private var baseProp_:EZBaseProperty = new EZBaseProperty();
	
		
	public function revive(extent:float){
		super.revive(extent);
		this.health_ = this.baseProp_.maxHealth * extent;
	}
	private var handler_:EZBuffHandler = null;
	
	public function get handler():EZBuffHandler{
		return handler_;
	}
	
	protected function EZSoulBase(){
		
	}
	public function get baseLv():float{
		return baseProp_.lv;
	}
	public function get baseQuality():float{  
		return baseProperty.quality;
	}  
	protected function loadBase(data:JsonData.BaseProperty){
		
		this.baseProp_.load(data);
		this.health_ = this.baseProp_.maxHealth;
		
	}
	
	
	
	
	
	
	private function get baseProperty():EZBaseProperty{
		return this.baseProp_;
	}
	
	

	public function get baseMaxHealth():float{  
		return baseProperty.maxHealth;
	}  
 
	
	
	public function get baseAttack():float{  
		return baseProperty.attack;
	}  
	
	
 	public function get baseSpeed():float{
		return baseProperty.speed;
	}  
	


};
