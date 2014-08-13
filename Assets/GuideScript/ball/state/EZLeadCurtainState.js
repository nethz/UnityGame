#pragma strict

class EZLeadCurtainState extends State{
	//private var task_:Task = null;
	private var isOver_:boolean = false;
	private var gameOver_:boolean = false;
	private var ctrl_:EZBallCtrl = null;
	private var impl_:EZBallsManagerImpl = null;
	public function EZLeadCurtainState(ctrl:EZBallCtrl, impl:EZBallsManagerImpl){
		ctrl_ = ctrl;
		impl_ = impl;
	}
	function start(){
		isOver_ = false;
		gameOver_ = false;
		var task:Task = ctrl_.curtainTask();
		TaskManager.PushBack(task, function(){
			if(impl_.isGameOver()){
				gameOver_ = true;
			}
			this.isOver_ = true;
		});
		TaskManager.Run(task);
	
	
	}

	function update(d:float){  
		if(gameOver_){
			return "game_over";
		}
		if(isOver_){
			return "lead_in_user";
		}
		return "";
	}
	
	function over(){
		impl_.shot();
		
	}
}