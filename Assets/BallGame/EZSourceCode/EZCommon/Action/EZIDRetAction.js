#pragma strict

class EZIDRetAction extends ActionObj{

	private var id_:int = 0;
	private var ret_:boolean = false;
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	
	public function get ret():boolean{
		return ret_;
	}
	public function set ret(value:boolean){
		this.ret_ = value;
	}

}