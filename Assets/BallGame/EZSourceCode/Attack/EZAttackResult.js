#pragma strict

class EZAttackResult{
	private var from_:EZSoul.Seat;
	private var to_:EZSoul.Seat;
	private var original_:float = 0;
	private var alter_:float = 0;
	
	public function set from(value:EZSoul.Seat){
		this.from_ = value;
	}
	public function get from():EZSoul.Seat{
		return from_;
	}
	public function set to(value:EZSoul.Seat){
		this.to_ = value;
	}
	public function get to():EZSoul.Seat{
		return to_;
	}
	public function set original(value:float){
		this.original_ = value;
	}
	public function get original():float{
		return this.original_;
	}
	public function set alter(value:float){
		this.alter_ = value;
	}
	public function get alter():float{
		return this.alter_;
	}
}