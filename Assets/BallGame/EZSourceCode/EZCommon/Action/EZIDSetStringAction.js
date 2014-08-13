#pragma strict

class EZIDSetStringAction extends ActionObj{
	
	private var val_:String;
	private var id_:int;
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	public function get val():String{
		return val_;
	}
	
	public function set val(value:String){
		val_ = value;
	}
}