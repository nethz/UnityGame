#pragma strict

class EZTechniqueInfo{
	private var power_:float;
	private var speed_:float;
	private var attack_:float;
	private var from_:EZSoul.Seat;
	private var to_:EZSoul.Seat;
	function EZTechniqueInfo(from:EZSoul.Seat, to:EZSoul.Seat, power:float, speed:float, attack:float){
		this.from_ = from;
		this.to_ = to;
		this.power_ = power;
		this.speed_ = speed;
		this.attack_ = attack;
	}
	public function get from():EZSoul.Seat{
		return this.from_;
	}

	public function get to():EZSoul.Seat{
		return this.to_;
	}
	
	public function get power():float{
		return power_;
	}

	public function get speed():float{
		return speed_;
	}
	
	public function get attack():float{
		return attack_;
	}
	

};