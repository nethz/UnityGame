#pragma strict

class EZIDPopTask extends Task{
	
	private var id_:int;
	private var val_:String;
	private var over_:boolean = false;
	private var layer_:int = -1;
	public function EZIDPopTask(){
		this.isOver = function(){
			return over_;
		};
	}
	
	public function get layer():int{
		return layer_;
	}
	public function set layer(value:int){
		
		this.layer_ = value;
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