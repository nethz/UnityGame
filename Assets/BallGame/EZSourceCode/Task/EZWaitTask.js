#pragma strict

class EZWaitTask extends Task{
	
	private var allTime_:float;
	private var time_:float;
	
	public function setAllTime(allTime:float){
		allTime_ = allTime;
	}
	
	public function EZWaitTask(){
		this.init = initImpl;
		this.update = updateImpl;
		this.isOver = isOverImpl;
	
	}
	public function initImpl(){
		time_ = 0;
	}
	public function updateImpl(d:float){
		time_ += d;
	}
	public function isOverImpl():boolean{
		if(time_ >= allTime_){
			return true;
		}
		return false;
	}

}