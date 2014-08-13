#pragma strict

class EZIDSetHpAction extends ActionObj{
	
	private var hp_:float;
	private var ad_:float;
	private var max_:float;
	private var id_:int;
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	public function get hp():float{
		return hp_;
	}
	
	public function set hp(value:float){
		hp_ = value;
	}
	
	
	public function get ad():float{
		return ad_;
	}
	
	public function set ad(value:float){
		ad_ = value;
	}
	
	
	public function get max():float{
		return max_;
	}
	
	public function set max(value:float){
		max_ = value;
	}
}