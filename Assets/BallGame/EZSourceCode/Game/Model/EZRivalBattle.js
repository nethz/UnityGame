#pragma strict


class EZRivalBattle extends EZContainer {

	function Awake(){
	
	}
	
	

	
	function reset(){
		this.soul.resetMagicPower();
		this.soul.resetSkillPower();
	}
	
	



	public function goOut(){
		this.setSoul(null);
	}
	
	
	
};