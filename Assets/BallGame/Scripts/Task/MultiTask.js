#pragma strict

class MultiTask extends Task{
	private var tasks_:Array = new Array();
	var overCount_:int = 0;
 	function MultiTask(){
		var self = this;
		
		this.init = function(){
			overCount_ = 0;
			var self = this;
			for(var i = 0; i < self.tasks_.length; ++i){
				var task = self.tasks_[i] as Task;
				TaskManager.Run(task);
			}
		};
		
		this.isOver = function(){
			return (self.overCount_ == self.tasks_.length);
		};
	
	}

	function push(task:Task){
		this.tasks_.push(task);
		TaskManager.PushBack(task, function(){overCount_++;});
	}
	
	
};