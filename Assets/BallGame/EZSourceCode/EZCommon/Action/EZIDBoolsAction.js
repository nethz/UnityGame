#pragma strict

class EZIDTBoolsAction extends ActionObj{

	private var id_:int = 0;
	private var bools_:boolean[] = null;
	public function EZIDTBoolsAction(num:int){
		bools_ = new boolean[num];
	}
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	
	public function getBool(n:int):boolean{
		return bools_[n];
	}
	public function setBool(n:int, ret:boolean){
		this.bools_[n] = ret;
	}

}