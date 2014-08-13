#pragma strict

class EZLeadBackState extends State{
	//private var task_:Task = null;
	private var isOver_:boolean = false;
	private var gameOver_:boolean = false;
	private var impl_:EZBallsManagerImpl = null;
	public function EZLeadBackState(impl:EZBallsManagerImpl){
		impl_ = impl;
		
	}
	function start(){
		Debug.Log("<========EZLeadBackState==========>");
		impl_.punch();
		isOver_ = true;
		
		var task:EZWaitTask = new EZWaitTask();
		task.setAllTime(0);
		TaskManager.PushBack(task, function(){
			impl_._no.play();
			if(impl_.isGameOver()){
				gameOver_ = true;
			}
			this.isOver_ = true;
		});
		TaskManager.Run(task);
	
	}

	function update(d:float):String{  
		if(gameOver_){
			return "game_over";
		}
		if(isOver_){
			return "lead_in_user";
		}
		return "";
		
	}
	
	function over(){
		impl_._groundManager.resetGroup();
	/*	for(var i:int =0 ; i<6; ++i){
			for(var j:int = 0 ; j< 5; j++){
				var ball:EZBall = impl_._balls.getObj(i, j) as EZBall;
				ball._view.setFlash(false);
			}
		}*/
	}
}