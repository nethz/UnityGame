class EZFighter extends EZBody{

	
	public var start:Function = null;
	public var over:Function = null;
	
	public function EZFighter(){
	}
	
	public var thinking:Function = null;
	public var getAttack:Function = null;
	public var getCrystal:Function = null;
	public var getSkill:Function = null;
	public var getMagic:Function = null;
	private var target_:EZBody = null;
	
	public function set target(value:EZBody){
		this.target_ = value;
	}
	public function get target():EZBody{
		return this.target_;
	}
	
	
	
	
};