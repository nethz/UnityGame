#pragma strict

class EZHurtFakeSoul extends EZFakeSoul{
	private var hurt_:float = 0;
	private var attack_:float = 0;
	//private var blood_:float = 0;
	function EZHurtFakeSoul(ret:EZAttackHandler.AttackResult){
		attack_ = ret.attack;
		hurt_ = ret.hurt ;
		//blood_ =  ret.blood;
		super(ret.to);
	}
	
	function get ad():float{
		if(attack_ > add_){
			return 0;
		}
		return add_ - attack_;
	}
	
	protected function getHealth():float{
		return soul_.health - hurt_;
		
	}
	
	function execute(){
		 soul_.health =  soul_.health - hurt_;
		 hurt_ = 0;
	}
}