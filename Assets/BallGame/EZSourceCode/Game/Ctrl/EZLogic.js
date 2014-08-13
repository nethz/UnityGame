#pragma strict

class EZLogic extends MonoBehaviour{
	public var _loader:EZLoader = null;
	public var _debugInput:boolean = false;
	public var _debugWeb:boolean = false;
	public var _demo:boolean = false;
	public var _demoNext:String = "";
	private var fsm_:FSM;
	public var _context:EZModelContext;
	private var inputState_:EZStateForTask = null;
	private var beginInputState_:EZStateForTask = null;
	public var _dialog:EZGameDialogView = null;
	public var _map:EZGameMapView = null;
	public var _resultSound:EZResultSound = null;
	public var _pets:EZPets = null;
	
	

	public function Awake(){
		this.fsm_ = new FSM();
		ActionManager.registerAction("controller.postEvent", postEventAction);
		ActionManager.registerAction("controller.addPower", addPowerAction);
	}  
	public function addPower(position:Vector3, ballType:Geek.MagicType, count:int){ 
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
			if(EZBallFailTalk.GetInstance()){
				EZBallFailTalk.GetInstance().addHit(count);
			}
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
		
	}
	public function addPowerAction():ActionObj{
		var power:EZPowerAction = new EZPowerAction(); 
		power.execute = function(){
			this.addPower(power.position, power.type, power.count);
		};
		return power;
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
	public function Start(){
		this.fsm_.addState("play", new EZPlayState(), "");
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
				Debug.Log("!!!!!!!!!!!");
				begin.isOver = true;
			});
			this.fsm_.addState("fight.begin.debug", new EZStateForTask(new EZFightDebugState(_context)), "fight");
			
			this.fsm_.addState("fight.begin.input", new EZFightDebugInput(debugTl), "fight.begin.debug");
			this.fsm_.addState("fight.begin.foe", new EZFightDebugFoe(_context), "fight.begin.debug");
			this.fsm_.addState("fight.begin.we", new EZFightDebugWe(_context), "fight.begin.debug");
			this.fsm_.addState("fight.begin.text", new EZFightDebugText(_context, _dialog), "fight.begin.debug");
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
		this.fsm_.addState("fight.begin.ready", new EZFightReadyState("fight.begin.input"), "fight");
		this.fsm_.addState("fight.ready", new EZFightReadyState("fight.input"), "fight");
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
		if(_demo){
			
			this.fsm_.addState("load", new EZLoadDemoState(_loader, _dialog, _map, _context), "play");
			this.fsm_.addState("fight.fail.title", new EZLobbyGoSceneState(_demoNext), "");
		}else if(_debugWeb){
			this.fsm_.addState("load", new EZLoadDebugState(_loader, _dialog, _map, _context), "play");
			this.fsm_.addState("fight.fail.title", new EZLobbyGoSceneState(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Game)), "");
		}else{
			this.fsm_.addState("load", new EZLoadState(_loader, _dialog, _map), "play");
			this.fsm_.addState("fight.fail", new EZFailState(_context), "fight"); 
			this.fsm_.addState("fight.fail.title", new EZFailTitleState(_loader, _context), "fight.fail"); 
			this.fsm_.addState("fight.fail.countdown", new EZFailCountdownState(_context), "fight.fail"); 
		}
		
		this.fsm_.addState("fight.run", new EZFightRunState(), "fight"); 
		this.fsm_.addState("fight.run.switch", new EZFightRunSwitchState(_context), "fight.run");
		this.fsm_.addState("fight.run.select", new EZFightRunSelectState(_context), "fight.run");
		this.fsm_.addState("fight.run.start", new EZFightRunStartState(this._context), "fight.run");
		this.fsm_.addState("fight.run.attack", new EZFightRunAttackState(this._context), "fight.run");
		this.fsm_.addState("fight.run.dot", new EZFightRunDotState(), "fight.run");
		this.fsm_.addState("fight.run.shift", new EZFightRunShiftState(this._context), "fight.run");
		this.fsm_.addState("fight.run.buff", new EZFightRunBuffState(), "fight.run");
		this.fsm_.addState("fight.run.over", new EZFightRunOverState(), "fight.run");
		
		
			
		this.fsm_.addState("fight.crystal.switch", new EZFightCrystalSwitchState(_context), "fight.run");
		this.fsm_.addState("fight.crystal.select", new EZFightCrystalSelectState(_context), "fight.run");
		this.fsm_.addState("fight.crystal.start", new EZFightCrystalStartState(this._context), "fight.run");
		this.fsm_.addState("fight.crystal.attack", new EZFightCrystalAttackState(this._context), "fight.run");
		this.fsm_.addState("fight.crystal.over", new EZFightCrystalOverState(), "fight.run");
		
		
		this.fsm_.addState("fight.award", new EZAwardState(), "fight");
		this.fsm_.init("load");
		TaskManager.registerTask("controller.curtain", curtainTask);
		
		ActionManager.Run("puzzle.loaded");
	}
	public function postEventAction():ActionObj{
		var action:EZPostEventAction = new EZPostEventAction(this.fsm_);
	
		return action;
	}
	public function onAction(action:String){
		fsm_.post(action);
	}
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}

}