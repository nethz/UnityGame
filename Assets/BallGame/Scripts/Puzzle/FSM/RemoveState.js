#pragma strict

class RemoveState extends State{
	private var task_:RemoveTask = null;
	private var ret_:String = null;
	//private var chantTask_:ChantTask = null
	var info_:RemoveInfo = null;
	function RemoveState(info:RemoveInfo){
		this.info_ = info;
	
	}
	function constructed(){
		var self = this;
		this.task_ = TaskManager.instance().factories.createTask("puzzle.remove") as RemoveTask;  
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
		var begin = Vector3( position.x, position.y, position.z - 500);
		
		var power:EZPowerAction = ActionManager.Create("controller.addPower");
		power.position = begin + PuzzleCamera.instance().transform.position;
		power.type = ballType;
		power.count = this.task_.getCount();
		ActionManager.Run(power);
		//this.effect(begin + PuzzleCamera.instance().transform.position, ballType, this.task_.getCount());
	} 
	
	 /*
	 function effect(begin:Vector3, BallType:Geek.MagicType, count:int){
	 		
			var magic:MagicTask = TaskManager.instance().factories.createTask("view.magic") as MagicTask;
			if(magic.testBallType(BallType))
			{
				magic.setBegin(begin);
				magic.setAllTime(GameSetup.getInstance().throwTime);
				magic.setBallType(BallType);
				magic.setPower(count);
				TaskManager.Run(magic);
				
			}else
			{
				magic.ignore();
			}
			/*
			var hit:HitTask = new HitTask();
			hit.setCount(count);
			hit.setPosition(begin);
			TaskManager.Run(hit);
			
	  }*/
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

