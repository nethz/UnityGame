#pragma strict

class EZAttackFakeSoul extends EZFakeSoul{
	private var attack_:float = 0;
	
	function EZAttackFakeSoul(ret:EZAttackHandler.AttackResult){
	
		attack_ = ret.attack < ret.hurt ? ret.attack: ret.hurt;
		super(ret.to);
	}
	function get ad():float{
		if(attack_ > add_){
			return 0;
		}
		return add_ - attack_;
	}
	
	protected function getHealth():float{
		if(attack_ > add_){
			return soul_.health - attack_ + add_;
		}
		
		return soul_.health;
		
	}
	function execute(){
		 Debug.LogError("EZAttackFakeSoul attack cant execute!!");
	}
}