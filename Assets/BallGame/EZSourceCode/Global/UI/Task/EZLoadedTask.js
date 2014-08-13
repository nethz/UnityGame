#pragma strict

class EZLoadedTask  extends Task{
	private var time_:float = 0;

	public function get time():float{
		return this.time_;
	}
	public function set time(value:float){
		this.time_ = value;
	}
	
	
}