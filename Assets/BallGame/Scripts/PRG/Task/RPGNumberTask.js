#pragma strict

class RPGNumberTask extends Task{

	private var begin_:Vector3 = Vector3(0,0,0);
	private var end_:Vector3 = Vector3(0,0,0);
	public var setup:Function = null;
	private var gameObj_:GameObject = null;
	private var time_:float = 0; 
	private var label_:UILabel = null; 
	private var text_:String;   
	private var color_:Color = Color.white;
	
	private var allTime_:float = 0.3;
	public function setAllTime(allTime:float){
		this.allTime_ = allTime;
	}
	public function RPGNumberTask(){
		this.init = this.initImpl;
		this.shutdown = this.shutdownImpl;
		this.update = this.updateImpl;
		this.isOver = this.isOverImpl; 
	}
	
	public function setColor(color:Color){
		this.color_ = color;
	}
	public function set position(value:Vector3){
		this.begin_ = value;
		this.begin_ += Vector3(0,0,-10);
		this.end_ = this.begin_ + Vector3(0,10, 0);
	} 
	public function set text(value:String){
		this.text_ = value;
	}
	
	private function initImpl(){ 
		this.time_ = 0; 
		//this.gameObj_ = DataCenter.getInstance().create("rpgText");
		this.gameObj_.transform.position = this.begin_;  
		this.label_ = this.gameObj_.GetComponentInChildren(UILabel) as UILabel; 
		this.label_.text = this.text_;  
		this.label_.color =  this.color_; 
		this.label_.color.a = 1;
	}
	private function shutdownImpl(){
		//DataCenter.getInstance().destroy(this.gameObj_);
	}
	private function interval(r:float){
		return this.begin_ * (1-r) + this.end_ *r; 
	}
	private function updateImpl(d:float){
		this.time_ += d; 
		this.gameObj_.transform.position = this.interval(this.time_/allTime_); 
		
		if(this.time_ >(allTime_ - 0.1))
		this.label_.color.a = 1 - ((this.time_-(allTime_ - 0.1))/0.1f);
	}
	private function isOverImpl():boolean{
		if(this.time_ >= allTime_)
			return true;
		return false;
	}
	
}