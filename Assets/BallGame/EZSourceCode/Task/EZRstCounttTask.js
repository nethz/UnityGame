#pragma strict
class EZRstCountTask extends Task{
	private var count_:int = 0;
	
	public function set count(value:int){
		this.count_ = value;
	}
	public function get count():int{
		return this.count_;
	}
	
	
}