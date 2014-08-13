#pragma strict

class ChantTask extends Task {


	private var position_:Vector3 = Vector3();
	private var object_:GameObject = null;
	private var hitBind_:HitBind  = null;
	private var text_:String = "";

	function ChantTask(){
		this.init = this.initImpl;
		this.shutdown = this.shutdownImpl;
		this.isOver = this.isOverImpl;
		this.update = this.updateImpl;
	}
	
	private function refreshText(){
		if(this.hitBind_ != null){
			this.hitBind_.setText(this.text_);
		}
		
	}	
	function setText(text:String){
		this.text_ = text;
		this.refreshText();
	}
	function setPosition(position:Vector3){
		this.position_ = position;
		this.refreshPosition();
	}
	private function refreshPosition(){
		//if(this.object_ != null)
			this.object_.transform.position = this.position_;
	}
	private function initImpl(){
	//	this.object_ = DataCenter.getInstance().create("hit");
	//	this.object_.name = "ChantTask";
	//	this.hitBind_ = this.object_.GetComponent(HitBind);
		this.refreshPosition();
		this.refreshText();
	}
	
	private function updateImpl(d:float){
		
	}
	private function shutdownImpl(){
		//DataCenter.getInstance().destroy(this.object_);
	
	}
	private function isOverImpl(){
		return false;
	}
}