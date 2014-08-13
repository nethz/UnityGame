#pragma strict

class EZCounterTask extends Task{
	
	private var counter_:int;
	private var over_:int;
	function EZCounterTask(over:int){
		over_ = over;
		this.isOver = function(){
			if(counter_ >= over_){
				return true;
			} 
			return false;
		};
	}
	public function get counter():int{
		return counter_;
	}
	public function set counter(value:int){
		this.counter_ = value;
	}
	public function counting(){
		++this.counter_;
	}
}