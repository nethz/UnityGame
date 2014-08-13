#pragma strict

class TaskList extends Task{
	private var begin_:Task = null;
	private var end_:Task = null;
	private var other_:Array = new Array(); 
	private var isOver_:boolean = false;
	private var isCompleted_:boolean = false;
	public function TaskList(){
		this.init = this.initImpl;
		this.isOver = this.isOverImpl;
	}
	public function push(task:Task){
		if(this.isCompleted_){
			Debug.LogError("list task is completed!");
		}
		if(this.begin_ == null && this.end_ == null)
		{
			this.begin_ = task;
			this.end_ = task;
		}else{
			var end:Task = this.end_;
			var oShutdown = end.shutdown;
			end.shutdown = function(){
				oShutdown();
				
				TaskManager.Run(task);
			};
			other_.push(this.end_);
			this.end_ = task;
			
		}
		
				
	}
	public function initImpl(){
		if(this.isCompleted_ == false && this.end_!=null){
			/*var oShutdown:Function = this.end_.shutdown;
			this.end_.shutdown = function(){
				oShutdown();
				this.isOver_ = true;
			};*/
			TaskManager.PushBack(this.end_, function(){this.isOver_ = true;});
			this.isCompleted_ = true;
		
		}
		
		if(this.begin_ != null){ 
			this.isOver_ = false;
			TaskManager.Run(begin_); 
		}else{
			this.isOver_ = true;
		} 
		
	}
	
	
	public function isOverImpl():boolean{
		return this.isOver_;
	}
};