#pragma strict

class EZIDTask extends Task{
	
	private var id_:int;
	
	private var over_:boolean;
	public function EZIDTask(){
	
		this.isOver = function(){
			return over_;
		};
	}
	
	public function get over():boolean{
		return over_;
	}
	public function set over(value:boolean){
		this.over_ = value;
	}
	
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		this.id_ = value;
	}
}