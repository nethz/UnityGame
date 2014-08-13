#pragma strict

class EZGameGuideOverState extends State{
	//private var isOver_:boolean = false;
	//private var gameOver_:boolean = false;
	private var ctrl_:EZBallCtrl = null;
	private var impl_:EZBallsManagerImpl = null;
	public function EZGameGuideOverState(ctrl:EZBallCtrl, impl:EZBallsManagerImpl){
		ctrl_ = ctrl;
		impl_ = impl;
	}
	function start(){
		var tl:TaskList = new TaskList();
		
		var task:Task = impl_.overTask();
		tl.push(task);
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(1.0f);
		tl.push(wait);
		
		TaskManager.PushBack(tl, function(){
			impl_.allOver();
		});
		TaskManager.Run(tl);
	/*
		isOver_ = false;
		gameOver_ = false;
		var task:Task = ctrl_.curtainTask();
		TaskManager.PushBack(task, function(){
			if(impl_.isGameOver()){
				gameOver_ = true;
			}
			this.isOver_ = true;
		});
	*/
	
	}

	function update(d:float){  
		
	}
	
	function over(){
	}
}