#pragma strict

class WalkTask extends Task {
	private var allTime_:float = 1;
	private var distance_:float = 100;
	function setAllTime(allTime:float){
		this.allTime_ = allTime;
	}
	function getAlltime(){
		return this.allTime_;
	
	}
	function setDistance(distance:float){
		this.distance_ = distance;
	} 
	function getDistance(){
		return this.distance_;
	
	}
	/*private var object_:GameObject = null;
	private var position_:Vector3 = Vector3();
	//private var end_:Vector3 = Vector3();
	private var hitBind_:HitBind = null;
	private var allTime_:float = 0;
	private var time_:float = 0;
	private var text_:String = "";
	private var count_:int = 0;
	function HitTask(){
		this.init = this.initImpl;
		this.update = this.updateImpl;
		this.shutdown = this.shutdownImpl;
		this.isOver = this.isOverImpl;
	}
	
	function setCount(count:int){
		this.count_ = count;
	}
	function setText(text:String){
		this.text_ = text;
		this.refreshText();
	}
	
	function setPosition(position:Vector3){
		this.position_ = position;
		this.refreshPosition();
	}
	private function refreshText(){
		if(this.hitBind_ != null){
			this.hitBind_.setText(this.text_);
		}
		
	}
	
	function getObject(){
		return this.object_;
	}
	function getPosition(){
		return this.position_;
	
	}
	private function refreshPosition(){
		if(this.object_ != null)
			this.object_.transform.position = this.position_;
	}
	
	function initImpl(){
		if(this.count_ <=4)
		{
			this.setText("HIT");
		}else
		{
			this.setText("CRIT");
		}
		this.object_ = DataCenter.getInstance().create("hit");
		this.object_.name = "HitTask";
		this.hitBind_ = this.object_.GetComponent(HitBind);
		this.allTime_ = 1;
		this.time_ = 0;
		this.refreshPosition();
		this.refreshText();
	}
	function updateImpl(d:float){
	//	time_+= d;
	}
	
	function shutdownImpl(){
	

	}
	
	function isOverImpl(){
		
		return (this.allTime_ > 0.8);
	
	}*/
};