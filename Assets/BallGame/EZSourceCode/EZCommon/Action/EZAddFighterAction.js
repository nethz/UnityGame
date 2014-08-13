#pragma strict

class EZAddFighterAction extends ActionObj{
	

	private var battle_:EZFighter = null;
	
	public function get battle():EZFighter{
		return battle_;
	}
	public function set battle(value:EZFighter){
		battle_ = value;
	}
	
	
	private var bag1_:EZFighter = null;
	
	public function get bag1():EZFighter{
		return bag1_;
	}
	public function set bag1(value:EZFighter){
		bag1_ = value;
	}
	
	
	private var bag2_:EZFighter = null;
	
	public function get bag2():EZFighter{
		return bag2_;
	}
	public function set bag2(value:EZFighter){
		bag2_ = value;
	}
	
}