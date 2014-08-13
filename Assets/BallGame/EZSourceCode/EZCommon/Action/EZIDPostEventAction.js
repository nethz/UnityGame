#pragma strict

class EZIDPostEventAction extends ActionObj{
	
	private var msg_:String;
	private var id_:int;
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	public function get msg():String{
		return msg_;
	}
	
	public function set msg(value:String){
		msg_ = value;
	}
}