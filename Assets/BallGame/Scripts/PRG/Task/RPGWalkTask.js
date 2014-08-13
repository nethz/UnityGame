#pragma strict

class RPGWalkTask extends Task{
	//private var target_:Vector3 = Vector3(100,0,0);
	private var speed_:float = 1;
	//function get target(){
	//	return target_;
	//}
	//function set target(value:Vector3){
	//	this.target_ = value;
	//}
	/*
	function set allTime(value:Vector3){
		this.allTime_ = value;
	}
	function get allTime(){
		return this.allTime_;
	}
	*/
	
	function set speed(value:float){
		this.speed_ = value;
	}
	function get speed(){
		return this.speed_;
	}
	
}