#pragma strict

class EZIDBoolAction extends ActionObj{

	private var id_:int = 0;
	private var bool_:boolean = false;
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	
	public function get val():boolean{
		return bool_;
	}
	public function set val(value:boolean){
		this.bool_ = value;
	}

}