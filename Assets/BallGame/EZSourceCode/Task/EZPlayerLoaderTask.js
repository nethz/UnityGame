#pragma strict

class EZPlayerLoaderTask extends Task{
	
	private var bag1_:Geek.SoulKey;
	private var bag2_:Geek.SoulKey;
	private var battle_:Geek.SoulKey;
	private var player_:String = "";
	public function get bag1():Geek.SoulKey{
		return bag1_;
	}
	
	public function get bag2():Geek.SoulKey{
		return bag2_;
	}
	public function get battle():Geek.SoulKey{
		return battle_;
	}

	 
	public function get player():String{
		 return player_;
	}
	
	
	public function set bag1(value:Geek.SoulKey){
		this.bag1_ = value;
	}
	
	public function set bag2(value:Geek.SoulKey){
		
		this.bag2_ = value;
	}
	public function set battle(value:Geek.SoulKey){
		battle_ = value;
	}

	public function set player(value:String){
		player_ = value;
	}
	
	//public function load(battle:String, bag1:String, bag2:String, pos:float){
	//	this.battle_ = battle;
	//	this.bag1_ = bag1;
	//	this.bag2_ = bag2;
	//	this.pos_ = pos;
	//}
	
}