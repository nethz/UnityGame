#pragma strict

class EZIDAction extends ActionObj{

	private var id_:int = 0;
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}

}