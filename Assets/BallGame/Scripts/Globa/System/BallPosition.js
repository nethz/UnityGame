#pragma strict

class BallPosition{
private var list_:Vector3[] = null;
private var dirty_:boolean = false;
private var rect_:Rect = Rect();
private var length_:int = 0;
private var position_:Vector3 = Vector3();
function BallPosition(count:int){
	this.reset(count);
}

function push(position:Vector3){
	Debug.Log(position);
	if(this.length_ >= this.list_.length)
		return;
	this.dirty_ = true;
	this.list_[this.length_] = position;
	++this.length_;
	refresh(position);

} 
function reset(count:int){
	this.list_ = new Vector3[count];
	this.length_ = 0;
	this.rect_ = Rect();

}
private function consideration(){
	var l:float = 9999999;
	var x:float = rect_.x + rect_.width/2;
	var y:float = rect_.y + rect_.height/2;
	for(var i = 0; i< this.length_; ++i)
	{	
	
		var p = this.list_[i];
		var lt:float = (p.x-x) * (p.x-x) + (p.y-y)*(p.y-y);
		if(lt < l){
			l = lt;
			this.position_ = p;
		}
	}
	this.dirty_ = false;
}
private function refresh(position:Vector3){
	if(this.length_ == 1){
		this.rect_.x = this.list_[0].x;
		this.rect_.y = this.list_[0].y;
	}else{
		if(position.x > this.rect_.x + this.rect_.width)
		{
			this.rect_.width = position.x - rect_.x;
		}else if(position.x < this.rect_.x)
		{
			this.rect_.x = position.x;
		}
		
		
		if(position.y > this.rect_.y + this.rect_.height)
		{
			this.rect_.height = position.y - rect_.y;
		}else if(position.y < this.rect_.y)
		{
			this.rect_.y = position.y;
		}
	
	}
	//this.dirty_ = false;
}
function getPosition(){

	if(this.dirty_){
		this.consideration();
	}
	return this.position_;
}
function getRect():Rect {
	return rect_;
}


};