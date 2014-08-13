#pragma strict
/*
class WeFighterManager extends MonoBehaviour {
	




	public var _calculator:Calculator = null;
	public var _battle:BattleContainer;
	public var _bag1:BagContainer;
	public var _bag2:BagContainer;
	public var _magic:MagicExtractor = null;
	private var fighter_:Fighter = null;
	
	private var fsm_:FSM = null;
	public function setAction(action:WeFighterAction){
		_calculator.weFighter = (this.getWeFighter());
		_bag1.action = action;
		_bag2.action = action;
		_battle.action = action;
	}
	public function userMagic():boolean{
		var soulEnchant:SoulEnchant = this._magic.soulEnchant; 
		if(soulEnchant && soulEnchant.magic){
			return true;
		} 
		return false;
	
	}
	private function createFighter():Fighter{
		
		var self = this;
		var fighter:Fighter = new Fighter();
		
		//fighter.clearMagicPower = function(){
		//	this._magic.soulEnchant.resetMagicPower();
		//} ;
		
		
		fighter.getAttack = function():Attack{ 
			if(userMagic() ||!this._battle.soulEnchant.alive)
				return null;
			return new NormalAttack(self._battle.soulEnchant.seat);//AttackManager.instance().getAttack(self._battle.soulEnchant.seat);
		};
		fighter.getSkill = function():Technique{
			if(userMagic())
				return null;
			
			self._battle.soulEnchant.move = true;
				
			if(self._battle.soulEnchant && self._battle.soulEnchant.skill)
			{
				if(self._battle.soulEnchant.skillPower > 0)
				{
					var info :TechniqueInfo = new TechniqueInfo( 
							self._battle.soulEnchant.seat,
							self._battle.soulEnchant.attackPower,
							self._battle.soulEnchant.baseSpeed
						);
					var skill:Technique = self._battle.soulEnchant.skill.clone(info);
					return skill;
				}
				else{
					return null;
				}
			}
			return null;
		};
		fighter.getMagic = function():Technique{ 
			if(userMagic()) { 
				
				var soulEnchant:SoulEnchant = this._magic.soulEnchant; 
				
				soulEnchant.move = true;
				var info :TechniqueInfo = new TechniqueInfo( 
						soulEnchant.seat,
						soulEnchant.magicMaxPower,
						soulEnchant.baseSpeed
					);
				var magic:Technique = self._battle.soulEnchant.magic.clone(info);
				return magic;
			}
			return null;
		};
		
		fighter.getName = function():String{
			return "we";
		};
		fighter.getSeat = function():Soul.Seat{
			return self._battle.seat;
		};
		fighter.alive = function():boolean{
			return _battle.hasSoul()&& self._battle.soulEnchant.health > 0;
		};
		fighter.getSpeed = function():float{ 
			var speed = 0;
			
			if(userMagic()) {   
			
				var magicEnchant:SoulEnchant = this._magic.soulEnchant;
				speed =  magicEnchant.baseSpeed + magicEnchant.magic.speed;
				return speed;
			}else{
				if(this._battle.soulEnchant ){
					speed =  this._battle.soulEnchant.baseSpeed;  
					if(this._battle.soulEnchant.skill &&this._battle.soulEnchant.skillPower > 0){
						speed +=  this._battle.soulEnchant.skill.speed;  
					} 
				}
			
			}
			return speed;
		};
		fighter.isTargeted = function():boolean{
			return true;
		};
		fighter.start = function(){  
			if(_bag1.soulEnchant){ 
				
				_bag1.soulEnchant.move = false;
			}
			if(_bag2.soulEnchant){
				_bag2.soulEnchant.move = false;
			}
			if(_battle.soulEnchant){
				_battle.soulEnchant.move = false;
			}
		};
		fighter.over = function(){
			self._magic.releaseMagic();
			self._battle.soulEnchant.resetAttackPower();
			self._battle.soulEnchant.resetSkillPower();
		};
		return fighter;
	}
	

	public function Awake(){
		var action:WeFighterAction = new WeFighterAction();
		action.toChange = this.toChange;
		action.doMagic= this.doMagic;
		action.doChange = this.doChange;
		this.setAction(action);
		ActionManager.registerAction("ui.set.we.soul", this.setSoulAction);
		Debug.LogError("nonono"+this.name);
	
	}
	
	public function OnDestroy(){
		ActionManager.unregisterAction("ui.set.we.soul");
	}
	
	public function setSoulAction():ActionObj{
		var act:LoadSoulAction = new LoadSoulAction();
		
		act.execute = function(){
			if(act.battle){
				var battleSoul:PetSoul = new PetSoul();
				battleSoul.load(act.battle); 
				this._battle.soul = battleSoul;
			}else{
				this._battle.soul = new NoneSoul();
			}
			if(act.bag1){  
			
				var bag1Soul:PetSoul = new PetSoul();
				bag1Soul.load(act.bag1); 
				this._bag1.soul = bag1Soul; 
			}else{
				this._bag1.soul = new NoneSoul();
			}
			if(act.bag2){ 
			
				var bag2Soul:PetSoul = new PetSoul();
				bag2Soul.load(act.bag2); 
				this._bag2.soul = bag2Soul; 
			}else{
				this._bag2.soul = new NoneSoul();
			}
		};
		return act;
	}
	
	public function setSoul(battle:Soul, bag1:Soul, bag2:Soul){
		this._battle.soul = battle;
		this._bag1.soul = bag1;
		this._bag2.soul = bag2;
	}
	public function Start() {
		
		this.setupFSM();
	}

	
	public function getWeFighter() : Fighter{
		if(fighter_ == null)
		{
			fighter_ = this.createFighter();
		}
		return this.fighter_;
	}
	
	public function doChange(bag:BagContainer){
		if(_battle.soulEnchant.alive && bag.soulEnchant.alive)
		{
			bag.changeTo(_battle);
			ActionManager.Run("puzzle.ignore");
		}else{
			Debug.Log("no change");
		}
	}
	
	public function change_(){
		
		_battle.change();
		_bag1.change();
		_bag2.change();
	}	
	
	
	public function open_(){
	
		_battle.open();
		_bag1.open();
		_bag2.open();
	}	
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	public function close_(){
		_battle.close();
		_bag1.close();
		_bag2.close();
	
	}
	
	function toChange() {
		var self = this;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "change";
		this.fsm_.postEvent(evt);
	}
	function open(){
		var self = this;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "open";
		this.fsm_.postEvent(evt);
	}
	function close(){
		if(this.fsm_ != null)
		{
			var self = this;
			var evt:FSMEvent = new FSMEvent();
			evt.msg = "close";
			this.fsm_.postEvent(evt);
		}
	}
	
	public function doMagic(bag:BagContainer){
		if(bag.soulEnchant.alive)
		{
			this._magic.container = bag;
			ActionManager.Run("puzzle.ignore");
		}else{
			Debug.Log("no magic");
		}
	}

	
	function addPower(type:Geek.MagicType, power:float)
	{
		_battle.addAttackPower(type, power);
		_bag1.addMagicPower(type, power);
		_bag2.addMagicPower(type, power);
	
	}
	
	function magicTask(){
		var self = this;
		var task:MagicTask = new MagicTask();
		var tt:ThrowTask[] = new ThrowTask[3];
		var throwTask:ThrowTask = null; 
		var t1:ThrowTask = null; 
		var t2:ThrowTask = null; 
		task.testBallType = function(type:Geek.MagicType){
			tt[0] = _battle.throwTask(type) as ThrowTask;
			tt[1] = _bag1.throwTask(type) as ThrowTask;
			tt[2] = _bag2.throwTask(type) as ThrowTask;
			
			return true;
		};
		task.setPower = function(power:int){
			for(var i:int = 0; i< tt.Length; ++i){
				if(tt[i])
					tt[i].setPower(power);
			}
		};
		task.init = function (){
			for(var i:int = 0; i< tt.Length; ++i){
				if(tt[i])
					tt[i].init();
			}
		};
		task.shutdown = function (){
			for(var i:int = 0; i< tt.Length; ++i){
				if(tt[i])
					tt[i].shutdown();
			}
		};
		task.update = function (d:float){
			for(var i:int = 0; i< tt.Length; ++i){
				if(tt[i])
					tt[i].update(d);
			}
		};
		task.isOver = function (){
		
			for(var i:int = 0; i< tt.Length; ++i){
				if(tt[i] && tt[i].isOver() == false)
					return false;
			}
			return true;
		};
		task.setBegin = function(p:Vector3){
			for(var i:int = 0; i< tt.Length; ++i){
				if(tt[i])
					tt[i].setBegin(p);
			}
		};
		task.setAllTime = function(t:float){
			
			for(var i:int = 0; i< tt.Length; ++i){
				if(tt[i])
					tt[i].setAllTime(t);
			}
		};
	
		task.ignore = function(){
		
		};
		return task;
	}

	function setupFSM(){
		this.fsm_ = new FSM();
		this.fsm_.addState("close", new UICloseState(this.close_), "");
		this.fsm_.addState("open", new UIOpenState(this.open_), "");
		this.fsm_.addState("change", new UIChangeState(this.change_), "");
		this.fsm_.init("close");
	}	
	
	public function get battle():BattleContainer{
		return _battle;
	}
};*/