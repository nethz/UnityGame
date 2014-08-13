#pragma strict

class EZFighterTask  extends Task{
	private var battle_:boolean = true;
	private var bag1_:boolean = true;
	private var bag2_:boolean = true;
	public function set battle(value:boolean){
		battle_ = value;
	}
	public function get battle():boolean{
		return battle_;
	}
	
	public function set bag1(value:boolean){
		bag1_ = value;
	}
	public function get bag1():boolean{
		return bag1_;
	}
	
	
	public function set bag2(value:boolean){
		bag2_ = value;
	}
	public function get bag2():boolean{
		return bag2_;
	}
}