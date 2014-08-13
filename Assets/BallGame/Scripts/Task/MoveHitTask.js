#pragma strict

class MoveHitTask extends Task {
	private var object_:GameObject = null;
	private var begin_:Vector3 = Vector3();
	private var end_:Vector3 = Vector3();
	private var allTime_:float = 0;
	private var time_:float = 0;
	
	private var parabola_:Vector3 = Vector3(0, 0, 0);
	function MoveHitTask(){
		this.init = this.initImpl;
		this.update = this.updateImpl;
		this.shutdown = this.shutdownImpl;
		this.isOver = this.isOverImpl;
	}
	
	function getAccelerated(){
		return GameSetup.getInstance().hitTextAccelerated;
	}
	
	function getAllTime(){
		return GameSetup.getInstance().hitTextAllTime;
	}
	function getV1(){
		var a:float = this.getAccelerated();
		var t:float = this.getAllTime();
		return (2 - a * t * t)/(2 *t);
	
	}
	function getV2(){
		var a:float = this.getAccelerated();
		var t:float = this.getAllTime();
		var v1:float = this.getV1();
		return v1+(a * t);
	
	}
	function getS(t:float){
		var v1 = this.getV1();
		
		var a:float = this.getAccelerated();
		return (v1 +(v1 + t*a)) * t /2;
	
	}
	function setEnd(end:Vector3){
		this.end_ = end;
	}
	function setBegin(begin:Vector3){
		this.begin_ = begin;
	
	}
	function setObject(object:GameObject){
	
		this.object_ = object;
	}
	
	private function interpolation(a:float, b:float)
	{
		return a* (1- (this.time_/this.allTime_)) + b* (this.time_/this.allTime_);
	}
	
	

	function initImpl(){
	
		this.allTime_ = 0.5;
		this.time_ = 0;
		if(this.begin_.x != this.end_.x && this.begin_.y != this.end_.y)
		{
			this.parabola_ = Geek.Parabola(Vector2(this.begin_.x, this.begin_.y), Vector2((this.begin_.x + this.end_.x)/2, this.end_.y+10), Vector2(this.end_.x, this.end_.y));
		}else{
			this.parabola_ = Vector3(0,0,0);
		}
	}
	
	function updateImpl(d:float){
		time_+= d;
		var x = interpolation(this.begin_.x, this.end_.x);
		var y = 0;
		var z = interpolation(this.begin_.z, this.end_.z);
		if(this.parabola_ != Vector3(0,0,0)){
			y = Geek.ThrowParabola(this.parabola_, x);
		}
		var position = new Vector3(
		x, y, z
		);
		
	
		this.object_.transform.position = position;
		
	}
	
	function shutdownImpl(){
		//DataCenter.getInstance().destroy(this.object_);
	}
	
	function isOverImpl(){
		return (this.time_ > this.allTime_);
	
	}
};