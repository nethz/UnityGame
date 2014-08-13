#pragma strict

class EZFoeLoaderTask extends Task{
	
	private var bag1_:Geek.SoulKey;
	private var bag2_:Geek.SoulKey;
	private var battle_:Geek.SoulKey;
	private var pos_:float = 0;
	public function get bag1():Geek.SoulKey{
		return bag1_;
	}
	
	public function get bag2():Geek.SoulKey{
		return bag2_;
	}
	public function get battle():Geek.SoulKey{
		return battle_;
	}
	public function get position():float{
		return pos_;
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
	public function set position(value:float){
		pos_ = value;
	}
	

	
}