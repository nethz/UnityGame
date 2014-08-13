#pragma strict

class EZPowerAction extends ActionObj{
	private var position_:Vector3;
	private var type_:Geek.MagicType;
	private var count_:int;
	
	public function set position(value:Vector3){
		this.position_ = value;
	}
	public function get position():Vector3{
		return this.position_;
	}
	
	public function set type(value:Geek.MagicType){
		this.type_ = value;
	}
	public function get type():Geek.MagicType{
		return this.type_;
	}
	
	public function set count(value:int){
		this.count_ = value;
	}
	
	public function get count():int{
		return this.count_;
	}
	
	
}