#pragma strict

class EZPVPLogic extends MonoBehaviour{
	
	private var fsm_:FSM;

	public var _loader:EZPVPLoader = null;
	public var _context:EZModelContext;
	private var beginInputState_:EZStateForTask = null;
	public var _debugInput:boolean = false;
	private var inputState_:EZStateForTask = null;
	public var _dialog:EZGameDialogView = null;
	/*public var _map:EZGameMapView = null;*/
	public var _resultSound:EZResultSound = null;
	public var _pets:EZPets = null;
	
	public function Awake(){
		this.fsm_ = new FSM();
		TaskManager.registerTask("controller.curtain", curtainTask);
		
		ActionManager.registerAction("controller.postEvent", postEventAction);
		ActionManager.registerAction("controller.addPower", addPowerAction);
	/*
		
		*/
	}  
	
	public function addPower(position:Vector3, ballType:Geek.MagicType, count:int){
//		_pets.input.enable = true;
		var battle:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBattle) as EZSoul;
		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1) as EZSoul;
		var bag2:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag2) as EZSoul;   
		var crystal:EZModelCrystal = EZContainerManager.GetCrystal();
		var mt:MultiTask = new MultiTask();
		var trw:EZThrowTask = TaskManager.Create("view.throw") as EZThrowTask; 
		trw.seat = EZView.Seat.WeBattle;
		if(battle.type == ballType){
			trw.type = ballType;
			battle.addSkillPower(count);
			TaskManager.PushBack(trw, function(){
				EZCtrl.ViewSkillBar(battle.seat, true);
			});
		}else{
			trw.type = ballType;
		}
		TaskManager.PushBack(trw, function(){
		
			EZCtrl.Feedback(EZSoul.Seat.WeBattle, Geek.GetColor(ballType,1,1));
			EZUIHit.GetInstance().addHit(count);
			
			
		});
				
		battle.addAttackPower(count);
		trw.original = position;
		mt.push(trw); 
		
		if(crystal && !crystal.filled && ballType == Geek.MagicType.Crystal){
			var btw0:EZThrowTask = TaskManager.Create("view.throw") as EZThrowTask; 
			btw0.seat = EZView.Seat.Hero; 
			btw0.type = ballType; 
			btw0.original = position;
			mt.push(btw0); 
			
			TaskManager.PushBack(btw0, function(){
				var filled:boolean = crystal.filled;
				crystal.addPower(ballType, count);
				if(!filled && EZCrystalInGame.GetInstance()){
				
					var power:Task = EZCrystalInGame.GetInstance().setPowerTask(crystal.power);
					TaskManager.Run(power);
				}
				
			});
		}
		if(bag1.alive && bag1.hasMagic() && bag1.type == ballType){ 
			var btw1:EZThrowTask = TaskManager.Create("view.throw") as EZThrowTask; 
			btw1.seat = EZView.Seat.WeBag1; 
			btw1.type = ballType; 
			btw1.original = position;
			mt.push(btw1); 
			
			TaskManager.PushBack(btw1, function(){
			
				EZCtrl.Feedback(EZSoul.Seat.WeBag1, Geek.GetColor(ballType,1,1));
				//_pets.input.feedback("Bag1",Geek.GetColor(ballType,1,1));
				bag1.addMagicPower(count);
				EZCtrl.ViewMagicBar(EZSoul.Seat.WeBag1, count);
				 
			});
			
				
		}
		
		if(bag2.alive && bag1.hasMagic() && bag2.type == ballType){ 
		
			var btw2:EZThrowTask = TaskManager.Create("view.throw") as EZThrowTask; 
			btw2.seat = EZView.Seat.WeBag2; 
			btw2.type = ballType;  
			btw2.original = position;  
			mt.push(btw2);
			TaskManager.PushBack(btw2, function(){
			
				EZCtrl.Feedback(EZSoul.Seat.WeBag2, Geek.GetColor(ballType,1,1));
				bag2.addMagicPower(count);
				EZCtrl.ViewMagicBar(EZSoul.Seat.WeBag2, count);
			
			});
		}
		
		TaskManager.Run(mt);
	 /*	*/
	}
	
	public function curtainTask():Task{ 
	
		var task:Task = new Task();
		
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			var disable:EZStateDisableTask = new EZStateDisableTask();
			
			inputState_.task = disable; 
			if(beginInputState_){
				beginInputState_.task = disable;
			}
			TaskManager.PushBack(disable, function(){ 
				isOver = true;
			});
			TaskManager.Run(disable);
		};
		task.shutdown = function(){
		};
		task.isOver = function():boolean{ return isOver;};
		return task;
		
	}
	public function OnDestroy(){
		ActionManager.unregisterAction("controller.addPower");
		ActionManager.unregisterAction("controller.postEvent");
		TaskManager.unregisterTask("controller.curtain");
	}
	public function goTask():Task{
		var mt:MultiTask =  new MultiTask();
		
		var inTask:Task = TaskManager.Create("rpg.camera.in") as Task;

		var hero:Task = TaskManager.Create("view.player.fighting") as Task;
		mt.push(hero);
		
		var rival:Task = TaskManager.Create("view.rival.fighting") as Task;
		mt.push(rival);
		
		
		mt.push(inTask);
		return mt;
	}
	public function Start(){
		this.fsm_.addState("play", new EZPlayState(), "");
		this.fsm_.addState("load", new EZPVPLoadDebugState(_loader), "play");
		this.fsm_.addState("ready", new EZPVPReadyState(), "play");
		this.fsm_.addState("fight", new EZPVPFightState(), "play");
		
		
		var begin:EZPVPFightBeginState = new EZPVPFightBeginState(_context);
		this.fsm_.addState("fight.begin.ready",  EZPVPFightReadyState("fight.begin.input"), "fight");
		this.fsm_.addState("fight.ready", EZPVPFightReadyState("fight.input"), "fight");
		var inTask:Task = goTask();
		TaskManager.PushFront(inTask, function(){
			Debug.Log("go");
			EZCtrl.ViewCrystal(true);
			begin.isOver = false;
		});
		TaskManager.PushBack(inTask, function(){
		
			Debug.Log("to");
		
			begin.isOver = true;
		});
		
		beginInputState_ = new EZStateForTask(new EZPVPFightInputState(inTask, _context));
		
		this.fsm_.addState("fight.begin.input", beginInputState_, "fight");
			
		
		this.fsm_.addState("fight.begin", begin, "fight");
			
		this.fsm_.addState("fight.run", new EZPVPFightRunState(), "fight"); 
		this.fsm_.addState("fight.run.switch", new EZPVPFightRunSwitchState(_context), "fight.run");
		this.fsm_.addState("fight.run.select", new EZPVPFightRunSelectState(), "fight.run");
		
		this.fsm_.addState("fight.run.chat", new EZPVPFightRunChatState(this._context), "fight.run");
		
		this.fsm_.addState("fight.run.start", new EZPVPFightRunStartState(this._context), "fight.run");
		
		this.fsm_.addState("fight.run.attack", new EZPVPFightRunAttackState(this._context), "fight.run");
		this.fsm_.addState("fight.run.dot", new EZPVPFightRunDotState(), "fight.run");
		this.fsm_.addState("fight.run.shift", new EZPVPFightRunShiftState(this._context), "fight.run");
		this.fsm_.addState("fight.run.buff", new EZPVPFightRunBuffState(), "fight.run");
		this.fsm_.addState("fight.run.over", new EZPVPFightRunOverState(), "fight.run");
		
		inputState_ = new EZStateForTask(new EZPVPFightInputState(null, _context)); 
		this.fsm_.addState("fight.input", inputState_, "fight");
	
		this.fsm_.addState("fight.info", new EZPVPFightInfoState(_context), "fight"); 
		this.fsm_.addState("fight.swap", new EZPVPFightSwapState(_context), "fight"); 
		this.fsm_.addState("rival.swap", new EZRivalFightSwapState(_context), "fight"); 
		
		
		
		this.fsm_.addState("fight.magic", new EZPVPFightMagicState(_context), "fight"); 
		this.fsm_.addState("rival.magic", new EZRivalFightMagicState(_context), "fight"); 
		
		
		this.fsm_.addState("fight.crystal", new EZPVPFightCrystalState(), "fight"); 
		this.fsm_.addState("rival.crystal", new EZRivalFightCrystalState(), "fight"); 
		
		
//	EZPVPFightBeginState
	
		
	/*	this.fsm_.addState("play", new EZPlayState(), "");

		this.fsm_.addState("next", new EZNextState(_map), "play");
		this.fsm_.addState("walk", new EZWalkState(_map), "play");
		this.fsm_.addState("rest", new EZRestState(_map), "play");
		this.fsm_.addState("lose", new EZLoseState(), "play");
		this.fsm_.addState("fight", new EZFightState(), "play");
		this.fsm_.addState("finish", new EZFinishState(_context), "play");
		
		this.fsm_.addState("finish.box", new EZFinishBoxState(_resultSound), "finish");
		this.fsm_.addState("finish.show", new EZFinishShowState(), "finish");
		
		this.fsm_.addState("finish.show.start", new EZFinishShowStartState(_loader), "finish.show");
		this.fsm_.addState("finish.show.web", new EZFinishShowWebState(_loader), "finish.show");
		this.fsm_.addState("finish.show.over", new EZFinishShowOverState(), "finish.show");
		
		
 
		
		
		var begin:EZFightBeginState = new EZFightBeginState(_context);
		this.fsm_.addState("fight.begin", begin, "fight");
		var inTask:Task = TaskManager.Create("rpg.camera.in") as Task;
		

		if(_debugWeb){
			var debugTl:TaskList = new TaskList();
			debugTl.push(inTask);	
			TaskManager.PushFront(debugTl, function(){
				EZCtrl.ViewCrystal(true);
				begin.isOver = false;
			});
			TaskManager.PushBack(debugTl, function(){
				begin.isOver = true;
			});
					
				
			
				this.fsm_.addState("fight.begin.input", new EZStateForTask(new EZFightDebugState(debugTl, _context, _dialog)), "fight");
		}else{
		
			TaskManager.PushFront(inTask, function(){
				EZPopCtrl.GetInstance().openFoe();
				EZCtrl.ViewCrystal(true);
				begin.isOver = false;
			});
			TaskManager.PushBack(inTask, function(){
				begin.isOver = true;
			});
			beginInputState_ = new EZStateForTask(new EZFightInputState(inTask, _context));
			
			this.fsm_.addState("fight.begin.input", beginInputState_, "fight");
		}
		inputState_ = new EZStateForTask(new EZFightInputState(null, _context)); 
		this.fsm_.addState("fight.begin.ready",  EZFightReadyState("fight.begin.input"), "fight");
		this.fsm_.addState("fight.ready", EZFightReadyState("fight.input"), "fight");
		this.fsm_.addState("fight.input", inputState_, "fight"); 
		this.fsm_.addState("fight.info", new EZFightInfoState(_context), "fight"); 
		this.fsm_.addState("fight.swap", new EZFightSwapState(_context), "fight"); 
		this.fsm_.addState("fight.magic", new EZFightMagicState(_context), "fight"); 
		this.fsm_.addState("fight.crystal", new EZFightCrystalState(), "fight"); 
		this.fsm_.addState("fight.fail.over", new EZFailOverState(_resultSound), "fight.fail"); 
		this.fsm_.addState("fight.fail.revive", new EZFailReviveState(_context), "fight.fail.countdown");
		this.fsm_.addState("fight.fail.web", new EZFailWebState(_context), "fight.fail.countdown"); 
		this.fsm_.addState("fight.fail.shop", new EZFailShopState(_context), "fight.fail.countdown"); 
		this.fsm_.addState("fight.revive", new EZFightReviveState(), "fight"); 
		
		
		
		this.fsm_.addState("fight.run", new EZFightRunState(), "fight"); 
		this.fsm_.addState("fight.run.switch", new EZFightRunSwitchState(_context), "fight.run");
		this.fsm_.addState("fight.run.select", new EZFightRunSelectState(_context), "fight.run");
		this.fsm_.addState("fight.run.start", new EZFightRunStartState(this._context), "fight.run");
		this.fsm_.addState("fight.run.attack", new EZFightRunAttackState(this._context), "fight.run");
		this.fsm_.addState("fight.run.dot", new EZFightRunDotState(), "fight.run");
		this.fsm_.addState("fight.run.shift", new EZFightRunShiftState(this._context), "fight.run");
		this.fsm_.addState("fight.run.buff", new EZFightRunBuffState(), "fight.run");
		this.fsm_.addState("fight.run.over", new EZFightRunOverState(), "fight.run");
		this.fsm_.addState("fight.award", new EZAwardState(), "fight");
		*/
		this.fsm_.init("load");
		
		ActionManager.Run("puzzle.loaded");
	}
	
	
	public function addPowerAction():ActionObj{
		var power:EZPowerAction = new EZPowerAction(); 
		power.execute = function(){
			this.addPower(power.position, power.type, power.count);
			
		};
		return power;
	}
	public function onAction(action:String){
		fsm_.post(action);
	}
	public function postEventAction():ActionObj{
		var action:EZPostEventAction = new EZPostEventAction(this.fsm_);
	
		return action;
	}
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	
}