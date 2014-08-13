#pragma strict

class EZIDSetStringTask extends Task{
	
	private var id_:int;
	private var val_:String;
	private var over_:boolean = false;
	public function EZIDSetStringTask(){
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
	
	
	public function get val():String{
		return val_;
	}
	public function set val(value:String){
		this.val_ = value;
	}
	
}