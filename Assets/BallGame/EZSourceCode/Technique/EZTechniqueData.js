#pragma strict

class EZTechniqueData{
	private var affixes_:EZAffix[] = null;
	public function get affixes():EZAffix[]{
		return affixes_;
	}
	public function set affixes(value:EZAffix[]){
		affixes_ = value;
	}
	
	private var data_:EZTechDataRoot = null;
	public function get data():EZTechDataRoot{
		return data_;
	}
	public function set data(value:EZTechDataRoot){
		data_ = value;
	}
	private var from_:EZSoul.Seat;
	public function set from(value:EZSoul.Seat){
		this.from_ = value;
	}
	public function get from():EZSoul.Seat{
		return from_;
	}
	private var to_:EZSoul.Seat;
	public function set to(value:EZSoul.Seat){
		this.to_ = value;
	}
	public function get to():EZSoul.Seat{
		return to_;
	}
	
	
	
	private var mark_:String;
	public function set mark(value:String){
		this.mark_ = value;
	}
	public function get mark():String{
		return mark_;
	}
	
	

}