#pragma strict

class EZDotContext{
	private var data_:EZTechDataValue = null;
	private var to_:EZSoul.Seat = EZSoul.Seat.None;
	private var from_:EZSoul.Seat = EZSoul.Seat.None;
	/*private var magicType_:Geek.MagicType = null;
	public function get from():EZSoul.Seat{
		return magicType_;
	}
	public function set magicType(value::EZSoul.Seat){
		this.magicType_ = value;
	}*/
	
	public function get to():EZSoul.Seat{
		return to_;
	}
	public function set to(value:EZSoul.Seat){
		this.to_ = value;
	}
	public function get from():EZSoul.Seat{
		return from_;
	}
	public function set from(value:EZSoul.Seat){
		this.from_ = value;
	}
	
	
	public function get data():EZTechDataValue{
		return data_;
	}
	
	public function set data(value:EZTechDataValue){
		this.data_ = value;
	}

	
}