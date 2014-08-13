#pragma strict

class ThrowTask extends MagicTask {
	private var begin_:Vector3 = Vector3(0, 0, 0);
	private var end_:Vector3 = Vector3(0, 0, 0);
	private var allTime_:float = 1;
	private var time_:float = 0;
	private var position_ = Vector3(0,0,0);
	private var isOver_ = false;
	private var object_:GameObject = null;
	private var parabola_:Vector3 = Vector3(0, 0, 0);
	private var type_:Geek.MagicType = Geek.MagicType.None;
	
	function ThrowTask(){
		this.init = this.initImpl;
		this.update = this.updateImpl;
		this.shutdown = this.shutdownImpl;
		this.isOver = this.isOverImpl;
		this.setEnd = this.setEndImpl;
		this.setBegin = this.setBeginImpl;
		this.setAllTime = this.setAllTimeImpl;
	}
	
	private function setEndImpl(end:Vector3){
		this.end_ = end;
		
	}
	private function setBeginImpl(begin:Vector3){
		this.begin_ = begin;
	}
	public function setType(type:Geek.MagicType){
		this.type_ = type;
	}
	private function initImpl(){/*
		this.object_ = DataCenter.getInstance().create("magic"); 
		var star:StarBind = this.object_.GetComponent("StarBind") as StarBind;
		star.setType(this.type_);
		time_ = 0;
		this.position_.x = this.begin_.x;
		this.position_.y = this.begin_.y;
		this.position_.z = this.begin_.z;
		this.action(this.position_);
		this.isOver_ = false;
		if(this.begin_.x != this.end_.x && this.begin_.y != this.end_.y)
		{
			this.parabola_ = Geek.Parabola(Vector2(this.begin_.x, this.begin_.y), Vector2((this.begin_.x + this.end_.x)/2, this.end_.y+10), Vector2(this.end_.x, this.end_.y));
		}else{
			this.parabola_ = Vector3(0,0,0);
		
		}*/
	}
	private function shutdownImpl(){
		this.position_.x = this.end_.x;
		this.position_.y = this.end_.y;
		this.position_.z = this.end_.z;
		this.action(this.position_);
		//DataCenter.getInstance().destroy(this.object_);
	}
	private function interpolation(a:float, b:float)
	{
		return a* (1- (this.time_/this.allTime_)) + b* (this.time_/this.allTime_);
	}
	private function updateImpl(d:float){
		this.time_ += d;
		if(this.time_ > this.allTime_)
		{
			this.time_ = this.allTime_;
			this.isOver_ = true;
		}
		var x = interpolation(this.begin_.x, this.end_.x);
		var y = 0;
		var z = interpolation(this.begin_.z, this.end_.z);
		if(this.parabola_ != Vector3(0,0,0)){
			y = Geek.ThrowParabola(this.parabola_, x);
		}
		var position = new Vector3(
		x, y, z
		);
		this.action(position);
	}
	function setAllTimeImpl(allTime:float){
		this.allTime_ = allTime;
	}
	
	
	
	function getAllTime(){
		return this.allTime_;
	}
	
	function isOverImpl(){return this.isOver_;}
	
	var action = function(position:Vector3){
		//this.object_.transform.position.x = position.x;
		//this.object_.transform.position.y = position.y;	
		//this.object_.transform.position.z = position.z;
	};
};