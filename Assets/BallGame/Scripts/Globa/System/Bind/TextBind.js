#pragma strict

private var text_:String = "empty";
private var alpha_:float = 1;
public var label:UILabel = null;
private var scale_:Vector3;//() = self.transform.localScale;
function Start () {
	scale_ = this.transform.localScale;
	this.refreshText();
	this.refreshAlpha();
}
function refreshAlpha(){
	if(this.text_ == null){
		return;
	}
	if(this.alpha_ == 0)
		label.text = "";
	else
		label.text = text_;
		
}
function refreshText(){
	if(this.text_ == null){
		return;
	}
	
	label.text = text_;
}

function setText(text:String){
	this.text_ = text;
	this.refreshText();
}
function changeTask(text:String, fadein:float, fadeout:float){
	
	var self = this;
	var task:Task = new Task();
	var oldScale:Vector3;
	var time:float = 0;
	task.init = function(){
		self.setText(text);
		oldScale = scale_;
		time= 0 ;
	};
	task.update = function(d:float){
		time += d ;
		
		if(time < fadein){
			this.transform.localScale = oldScale * ((time/fadein) +1);
		}else{
			this.transform.localScale = oldScale * (1 + (1 -(time-fadein)/fadeout));
		}
		
	};
	task.isOver = function(){
		return (time>=(fadein + fadeout));
	};
	task.shutdown = function(){
	
		self.transform.localScale = oldScale;
	};
	return task;

}
function setAlpha(alpha:float){
	this.alpha_ = alpha;
	this.refreshAlpha();
}
function changeAlpha(alphaIn:float, alphaOut:float, allTime:float){
	var self = this;
	var task:Task = new Task();
	var time:float = 0;
	task.init = function(){
		self.setAlpha(alphaIn);
	};
	
	task.update = function(d:float){
		time += d;
		var s:float = time/allTime;
		self.setAlpha( alphaIn*(1-s) + alphaOut *s);	
	};
	task.isOver = function(){
		return (time >= allTime);
	
	};
	task.shutdown = function(){
		self.setAlpha(alphaOut);
	};
	return task;

}
function getText(){
	return this.text_;
}