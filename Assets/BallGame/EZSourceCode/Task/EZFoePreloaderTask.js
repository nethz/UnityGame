#pragma strict

class EZFoePreloaderTask extends Task{
	
	private var bag1_:List.<Geek.SoulKey> = new List.<Geek.SoulKey>();
	private var bag2_:List.<Geek.SoulKey> = new List.<Geek.SoulKey>();
	private var battle_:List.<Geek.SoulKey> = new List.<Geek.SoulKey>();
	
	public function get bag1():List.<Geek.SoulKey>{
		return bag1_;
	}
	
	public function get bag2():List.<Geek.SoulKey>{
		return bag2_;
	}
	public function get battle():List.<Geek.SoulKey>{
		return battle_;
	}
	
	
	
	public function addBag1(key:Geek.SoulKey){
		bag1_.Add(key);
	}
	
	public function addBag2(key:Geek.SoulKey){
		
		bag2_.Add(key);
	}
	public function addBattle(key:Geek.SoulKey){
		battle_.Add(key);
	}


	

	
}