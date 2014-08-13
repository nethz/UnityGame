#pragma strict

class EZIDTRetsAction extends ActionObj{

	private var id_:int = 0;
	private var rets_:boolean[] = null;
	public function EZIDTRetsAction(num:int){
		rets_ = new boolean[num];
	}
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	
	public function getRet(n:int):boolean{
		return rets_[n];
	}
	public function setRet(n:int, ret:boolean){
		this.rets_[n] = ret;
	}

}