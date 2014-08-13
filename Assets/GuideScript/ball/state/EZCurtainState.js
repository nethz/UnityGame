#pragma strict

class EZCurtainState extends State{
	//private var task_:Task = null;
	private var isOver_:boolean = false;
	private var gameOver_:boolean = false;
	private var ctrl_:EZBallCtrl = null;
	private var impl_:EZBallsManagerImpl = null;
	public function EZCurtainState(ctrl:EZBallCtrl, impl:EZBallsManagerImpl){
		ctrl_ = ctrl;
		impl_ = impl;
	}
	function start(){
		Debug.Log("<========EZCurtainState==============>");
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
			if(EZLeadManager.GetInstance() && EZLeadManager.GetInstance().leadPuzzle()){
				//return "lead_user";
				return "lead_dialog";
			}else{
				return "user";
			}
		}
		return "";
	}
	
	function over(){
		if(EZLeadManager.GetInstance() && EZLeadManager.GetInstance().leadPuzzle()){
			impl_.shot();
		}
	}
}