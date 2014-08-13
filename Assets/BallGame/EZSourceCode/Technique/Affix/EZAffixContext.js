#pragma strict



class EZAffixContext{

	private var from_:EZSoul.Seat = EZSoul.Seat.None;
	private var to_:EZSoul.Seat = EZSoul.Seat.None;
	private var attack_:float = 0;
	private var power_:float = 0;
	private var speed_:float = 0;
	protected var data_:EZTechDataRoot = null;
	
	
	
	public function get root():EZTechDataRoot{
		return data_;
	}
	
	public function set root(value:EZTechDataRoot){
		
		this.data_ = value;
	}

	public function get from():EZSoul.Seat{
		return from_;
	}
	
	public function set from(value:EZSoul.Seat){
		this.from_ = value;
	}
	
	public function get to():EZSoul.Seat{
		return to_;
	}
	public function set to(value:EZSoul.Seat){
		this.to_ = value;
	}
	
	public function get attack():float{
		return attack_;
	}
	public function set attack(value:float){
		this.attack_ = value;
	}
	
	public function get power():float{
		return power_;
	}
	public function set power(value:float){
		this.power_ = value;
	}
	
	
	public function get speed():float{
		return speed_;
	}
	public function set speed(value:float){
		this.speed_ = value;
	}
};