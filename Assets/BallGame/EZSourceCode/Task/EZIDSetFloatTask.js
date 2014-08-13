#pragma strict

class EZIDSetFloatTask extends Task{
	
	private var id_:int;
	private var val_:float;
	private var over_:boolean;
	public function EZIDSetFloatTask(){
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
	
	
	public function get val():float{
		return val_;
	}
	public function set val(value:float){
		this.val_ = value;
	}
	
}