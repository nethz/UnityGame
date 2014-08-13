#pragma strict

class EZIDNumberAction extends ActionObj{
	
	private var from_:float = 0.0f;
	private var to_:float = 1.0f;
	private var size_:EZHudNumber.Size = EZHudNumber.Size.Small;
	private var id_:int = 0;
	private var color_:EZHudNumber.EzColor = EZHudNumber.EzColor.Red;
	public function set size(value:EZHudNumber.Size){
		size_ = value;
	}
	public function get size():EZHudNumber.Size{
		return size_;
	}
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	public function set from(value:float){
		from_ = value;
		
	}
	public function get from():float{
		return from_;
	}
	public function set to(value:float){
		to_ = value;
	}
	public function get to():float{
		return to_;
	}
	
	

	public function set color(value:EZHudNumber.EzColor){
		this.color_ = value;
	}
	public function get color():EZHudNumber.EzColor{
		return this.color_;
	}
	
	
}