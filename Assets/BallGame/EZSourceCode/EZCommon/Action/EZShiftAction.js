#pragma strict

class EZShiftAction extends ActionObj{
	
	private var id_:int;
	private var seat_:EZSoul.Seat = EZSoul.Seat.None;
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	public function get seat():EZSoul.Seat{
		return seat_;
	}
	public function set seat(value:EZSoul.Seat){
		seat_ = value;
	}

	
}