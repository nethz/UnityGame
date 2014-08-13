#pragma strict

class EZRemoveState extends State{
	private var task_:EZRemoveTask = null;
	private var ret_:String = null;
	var info_:EZRemoveInfo = null;
	private var ctrl_:EZBallCtrl;
	function EZRemoveState(ctrl:EZBallCtrl, info:EZRemoveInfo){
		this.info_ = info;
		 ctrl_ = ctrl;
	
	}
	function constructed(){
		var self = this;
		this.task_ = TaskManager.instance().factories.createTask("puzzle.remove") as EZRemoveTask;  
		this.task_.setInfoAccepted(this.info_);
		var _shutdown = this.task_.shutdown;
		this.task_.shutdown = function(){
			self.taskShutdownCallback();
			_shutdown();
		};
		 
		var _init = this.task_.init;
		this.task_.init = function(){
			_init();
			self.taskInitCallback();		
		};
	}
	function taskInitCallback(){
		var position:Vector3 = this.task_.getPosition();
		var ballType:Geek.MagicType = this.task_.getBallType();
		//var begin = Vector3(position.x, position.y, position.z - 500);
		//position = Vector3.zero;
		ctrl_.addPower(position, ballType, this.task_.getCount());
	} 

	function taskShutdownCallback(){
		if(this.task_.hasMore()){
			ret_ = "remove";
		}else{	
			ret_ = "fall";
		}
	}
	function start(){
		this.getCurrState("action");
		ret_ = null;
		TaskManager.Run(this.task_);
	}
	function update(d:float){
		if(ret_!= null)
			return this.ret_;
			
			
		return "";
	}
};

