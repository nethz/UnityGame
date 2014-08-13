#pragma strict

class EZIDDropDataAction extends ActionObj{

	private var id_:int = 0;
	private var money_:int = 0;
	private var dropQuality_:int = -1;
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	/*
	public function get money():int{
		return money_;
	}
	public function set money(value:int){
		this.money_ = value;
	}*/
	
	public function get dropQuality():int{
		return dropQuality_;
	}
	public function set dropQuality(value:int){
		this.dropQuality_ = value;
	}

}