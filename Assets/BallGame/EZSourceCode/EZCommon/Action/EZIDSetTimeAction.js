#pragma strict

class EZIDSetTimeAction extends ActionObj{
	
	private var time_:int;
	private var id_:int;
	
	private var val_:float;
	private var all_:float;
	private var state_:EZHudState.State = EZHudState.State.WeMagic;
	
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	public function get time():int{
		return time_;
	}
	
	public function set time(value:int){
		time_ = value;
	}
	
	public function get val():float{
		return val_;
	}
	
	public function set val(value:float){
		val_ = value;
	}
	
	
	
	public function get all():float{
		return all_;
	}
	
	public function set all(value:float){
		all_ = value;
	}
	
		
	public function get state():EZHudState.State{
		return state_;
	}
	
	public function set state(value:EZHudState.State){
		state_ = value;
	}
	
}