#pragma strict
private var exSpriteFont_:exSpriteFont = null;
private var text_:String  = "empty";
private var alpha_:float = 1;
function Start () {
	this.exSpriteFont_ = GetComponent("exSpriteFont") as exSpriteFont;
	
	refreshText();
	refreshAlpha();
	
	if(GameSetup.getInstance() != null && GameSetup.getInstance().isDebug)
	{
		this.renderer.enabled = false;
	}
}

function Update () {
}

private function refreshText(){
	if(this.exSpriteFont_ != null){
		this.exSpriteFont_.text = this.text_;
	}
}
function alphaTask(from:float, to:float, allTime:float){
	var self = this;
	var task:Task = new Task();
	var alpha:float = 0;
	var time:float = 0;
	task.init = function (){
		time = 0;
		self.setAlpha(from);	
		};
	
	task.update = function(d:float){
		time += d;
		var ratio = time/0.3;
		self.setAlpha( from * ratio + to*(1-ratio));	
	};
	
	
	
	task.isOver = function(){
		return (time >= allTime);
	};
	task.shutdown = function(){
		self.setAlpha(to);		
	};
	return task;

}
private function refreshAlpha(){
	if(this.exSpriteFont_ != null){
		this.exSpriteFont_.topColor.a = this.alpha_;
		this.exSpriteFont_.botColor.a = this.alpha_;
		this.exSpriteFont_.outlineColor.a = this.alpha_;
	}

}

function setAlpha(alpha:float){
	this.alpha_ = alpha;
	this.refreshAlpha();
}
function show(){
	this.transform.renderer.enabled = true;
}

function hide(){
	this.transform.renderer.enabled = false;
}


function setText(text:String)
{
	this.text_ = text;
	refreshText();
}