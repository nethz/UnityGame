#pragma strict

class EZFakeSoul{
	protected var soul_:EZSoul = null;
	protected var add_:float = 0.0f;
	function EZFakeSoul(soul:EZSoul){
		soul_ = soul;
		var handler:EZBuffHandler = soul_.getBuffHandler();
		handler.refresh();
		add_ = handler.shieldValue;
	}
	function get ad():float{
		return add_;
	}
	function get seat():EZSoul.Seat{
		return soul_.seat;
	}

	function get baseMaxHealth():float{
		return soul_.baseMaxHealth;
	}
	protected function getHealth():float{
		return soul_.health;
	}
	function get health():float{
		var health:float = this.getHealth();
		if(health < 0.0f)
			return 0.0f;
		if(this.baseMaxHealth < health){
			return this.baseMaxHealth;
		}
		return health;
		
	}
	function execute(){
		
	}
}