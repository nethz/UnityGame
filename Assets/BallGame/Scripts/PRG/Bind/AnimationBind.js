#pragma strict
private var currTask_:AnimationTask  = null;

function animationOver(name:String){
	if(this.currTask_ != null){
		currTask_.close();
		this.currTask_ = null;
	}
}



function animationTask(animBegin:String) {	
	var self = this;
	var task:AnimationTask = new AnimationTask();
	var animation:exSpriteAnimation = GetComponentInChildren(exSpriteAnimation);
	
	var t:float = 0;
	var over:boolean = false;
	var forceOver:boolean = false;
	task.init = function(){
		if(self.currTask_ != null)
		{
			self.currTask_.forceClose();
			self.currTask_ = null;
		}
		forceOver = false;
		over = false;
		self.currTask_ = task;
		animation.Play(animBegin/*"ActorChant"*/);
	};
	task.close = function(){
	
		over = true;
	};
	
	task.forceClose = function(){
		if(animation.IsPlaying(animBegin))
		{
			animation.Stop();
			forceOver = true;
		}
	};
	task.update = function(d:float){
		t += d;
	};
	task.isOver = function(){
		if(forceOver)
			return true;
		return over;
	
	};
	task.shutdown = function(){
	
		if(!forceOver){
			animation.Play(animation.defaultAnimation.name);
		}
	};
	return task;
	

}