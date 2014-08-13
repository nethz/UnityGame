#pragma strict

class EZPetObj extends EZPet{
	public var _attackSound:EZSound = null;
	public var _magicSound:EZSound = null;
	public var _provokeSound:EZSound = null;
	public var _actionSound:EZSound = null;
	public var _booldSound:EZSound = null;
	public var _dotSound:EZSound = null;
	
	public var _soundType:EZMonsterSound.Type = EZMonsterSound.Type.Universal;
	public var _body:EZSkeletal;
	public var _attackTime:float = 0.5f;
	public var _magicTime:float = 0.5f;
	public var _mouseHander:EZMouseHandler;
	private var fsm_:FSM;
	private var scale_:Vector3 = Vector3.zero; 
	private var scaleHud_:Vector3; 
	private var attackState_:EZStateForTask;
	private var hurtState_:EZStateForTask;
	private var hurtingState_:EZStateForTask;
	private var reviveState_:EZStateForTask;
	private var collectState_:EZStateForTask;
	private var dieState_:EZStateForTask;
	private var winState_:EZStateForTask;
	private var hurtDieState_:EZStateForTask;
	private var freeingState_:EZStateForTask;
	public var _flame:EZFlameManager;
	public var _attack:EZSkeletalAttack;
	private var drowsyState_:EZStateForTask;
	private var provokeState_:EZStateForTask;
	private var loaded_:boolean = false;
	
	public var _soundAttack:PetSoundEffect.AttackType = PetSoundEffect.AttackType.Nomal;
	public var _soundDefense:PetSoundEffect.DefenseType = PetSoundEffect.DefenseType.Nomal;
	
	public function attackType():PetSoundEffect.AttackType{
		return _soundAttack;
	}
	public function defenseType():PetSoundEffect.DefenseType{
		return _soundDefense;
	}
	
	
	
	private var _magicType:Geek.MagicType = Geek.MagicType.None;
	
	public function set magicType(value:Geek.MagicType){ 
		_magicType = value;
	}
	private var weakup_:boolean = false;
	public function Awake(){
		fsm_ = null;
	}
	
	
	private var data_:EZBindData;
	function setBindData(data:EZBindData){
		if(data != null && (data_ == null||data_.name != data.name)){
			if(data_){
				hud.bind.execute(data_, EZBindData.Action.Destroy);
				data_ = null;
			}
			data_ = data;
			
			hud.bind.execute(data_, EZBindData.Action.Create);
			if(this.hud){
				this.hud.showText(data_.title, Color.white);
			}
			
		}
	}
	
	
	
	public function addState(task:Task, state:String, pather:String, next:String):EZStateForTask{
		var sft:EZStateForTask = new EZStateForTask(new EZPetTaskState(state, task, next));
		this.fsm_.addState(state, sft, pather); 
		return sft;
	}
	

	public function Start(){ 
		var sound:EZMonsterSound.Sound = EZMonsterSound.GetInstance().getSound(_soundType);
		
		if(_attackSound == null){
			_attackSound = sound.attack;
		}
		if(_magicSound == null){
			_magicSound = sound.magic;
		}
		if(_provokeSound == null){
			_provokeSound = sound.provoke;
		}
	
		
		weakup_ = false;
		this.fsm_ = new FSM();
		this.fsm_.addState("loading", new EZPetLoadingState(),"");
		this.fsm_.addState("sleep", new EZPetSleepState(_body, hud, _flame),"");
		this.fsm_.addState("grave", new EZPetGraveState(_body, ghost),"");
		this.fsm_.addState("death", new EZPetDeathState(_body, hud, _flame),"");
		
///////////////////////// weakup ///////////////////////////	
		
		this.fsm_.addState("weakup", new EZPetWeakupState(
		function(){weakup_ = true;},
		function(){weakup_ = false;}
		),""); 
		 
		this.fsm_.addState("weakup.idle", new EZPetIdleState(_body.createAnimationTask("idle")),"weakup");
		attackState_ = addState(animation("attack", _attackSound), "weakup.attack", "weakup", "weakup.idle");
		
		this.fsm_.addState("weakup.magic", new EZStateForAction(animation("magic", _magicSound)),"weakup");
		provokeState_ = addState(animation("provoke", _provokeSound), "weakup.provoke", "weakup", "weakup.idle");
		hurtState_ = addState(animationHurt(), "weakup.hurt", "weakup", "weakup.idle");
		hurtingState_ = addState(animationHurting(0.3f), "weakup.hurting", "weakup", "weakup.idle");
		winState_ = addState(animation("provoke", _provokeSound), "weakup.win", "weakup", "sleep");
		

		this.fsm_.addState("ghost", new EZPetGhostState(this.ghost),"");
		
		
		drowsyState_ = addState(this.drowsy(), "drowsy", "", "sleep");
		dieState_ = addState(this.die(), "die", "", "death");
		hurtDieState_ = addState(this.hurtDie(), "hurtDie", "", "death");
		freeingState_ = addState(this.freeing(), "freeing", "", "ghost");
		reviveState_ = addState(this.revive(), "revive", "", "weakup.idle");
		collectState_ = addState(this.collect(), "collect", "", "death");
		
		if(loaded_){
			this.fsm_.init("sleep");
		}else{
			this.fsm_.init("loading");
		}
	}
	
	public function animationHurting(time:float):Task{
	
		var anim:EZAnimationTask = _body.createAnimationTask("hurt");
	
		//anim.setCallback(function(){
		//	anim.close();
		//});
		var wait:EZWaitTask = new EZWaitTask();
 		wait.setAllTime(time);
 		TaskManager.PushBack(wait, function(){
			anim.close();
			//anim.pose("idle");
		});
	
		TaskManager.PushFront(anim, function(){
			anim.pose("idle");
			TaskManager.Run(wait);
			if(_actionSound != null){
				_actionSound.play();
			}
		});
	 
		
		
		return anim;
	}
	public function animationHurt():Task{
		var anim:EZAnimationTask = _body.createAnimationTask("hurt");
		anim.setCallback(function(){
			anim.close();
			//anim.pose("idle");
		});
	
	 	TaskManager.PushFront(anim, function(){
	 		
			anim.pose("idle");
	 		if(_actionSound != null){
				_actionSound.play();
			}
		});
	 
		
		return anim;
		
		
	}
	public function animation(name:String, sound:EZSound):Task{
		var anim:EZAnimationTask = _body.createAnimationTask(name);
		anim.setCallback(function(){
			anim.close();
		//	anim.pose("idle");
		});
			
		if(sound != null){
		 	TaskManager.PushFront(anim, function(){
		 	
				anim.pose("idle");
				sound.play();
			});
		 	TaskManager.PushBack(anim, function(){
				sound.stop();
			});
		
		}
		
		return anim;
	}

	
	public function setAlpha(alpha:float){
		if(alpha == 1){
			if(!_body.boxCollider.enabled)
				_body.boxCollider.enabled = true;
		}else if(alpha == 0){
			if(_body.boxCollider.enabled)
				_body.boxCollider.enabled = false;
		}
		this._body.alpha = alpha; 
		if(this.hud){
			this.hud.alpha = alpha;
		} 
		if(_flame){
			_flame.alpha = alpha;
		}
	}
	
	
	
	public function get weakup():boolean{
		return weakup_;
	}
	
	public function revive():Task{
		 var tv:GeekTweenValue = null;
		 var task:Task = new Task();
		 task.init = function(){
		 	
		 	ghost.hide();
		 	tv = GeekTweenValue.Begin(this.gameObject, 0.5f, body.alpha, 1, this.gameObject, "setAlpha");
		 	
		 };
		 task.isOver = function():boolean{
		 	if(tv){
		 		return !tv.enabled;
		 	}
		 	return true;
		 };
		 
	
		return task;
	
	}

	public function die():Task{
		 var tv:GeekTweenValue = null;
		 var task:Task = new Task();
		 
		 task.init = function(){
		 	tv = GeekTweenValue.Begin(this.gameObject,0.5f, body.alpha, 0, this.gameObject, "setAlpha");
		 	
		 };
		 task.isOver = function():boolean{
		 	if(tv){
		 		return !tv.enabled;
		 	}
		 	return true;
		 };
		return task;
	}
	
	public function hurtDie():Task{
		var mt:MultiTask = new MultiTask();
		 var tv:GeekTweenValue = null;
		 var task:Task = new Task();
		 task.init = function(){
		 	tv = GeekTweenValue.Begin(this.gameObject,0.5, body.alpha, 0, this.gameObject, "setAlpha");
		 	
		 };
		 task.isOver = function():boolean{
		 	if(tv){
		 		return !tv.enabled;
		 	}
		 	return true;
		 };
		 
		mt.push(task);
		var hurt:EZAnimationTask = _body.createAnimationTask("hurt");
		hurt.setCallback(function(){
			hurt.close();
			});
		mt.push(hurt);
		return mt;
	}
	
	public function freeing():Task{
		var mt:MultiTask = new MultiTask();
	
		 var tv:GeekTweenValue = null;
		 var task:Task = new Task();
		 task.init = function(){
		 	ghost.show();
		 	tv = GeekTweenValue.Begin(this.gameObject,0.5, body.alpha, 0, this.gameObject, "setAlpha");
		 	
		 };
		 
		 task.isOver = function():boolean{
		 	if(tv){
		 		return !tv.enabled;
		 	}	
		 	return true;
		 };
		mt.push(task); 
		
		return mt;
	}
	
	public function collect():Task{
	
		if(ghost){
			var task:Task = this.ghost.collect();
			
			TaskManager.PushBack(task, function(){
				ghost.hide();
			});
			return task;
		}
		return new Task();
		
	}
	
	
	
	public function drowsy():Task{
		var tv:GeekTweenValue = null;
		 var task:Task = new Task();
		 task.init = function(){
		 	tv = GeekTweenValue.Begin(this.gameObject,0.5, body.alpha, 0, this.gameObject, "setAlpha");
		 	
		 };
		 task.isOver = function():boolean{
		 	if(tv){
		 		return !tv.enabled;
		 	}
		 	return true;
		 };
		return task;
	}
	
	public function flicker(enable:boolean, layer:int){
		if(enable){
			Debug.LogWarning("flicker!!!!!");
			specially.effect.flicker(layer);
		}else{
			Debug.LogWarning("normal!!!!!");
			specially.effect.normal(layer);
		}
		
	}
	public function selected(enable:boolean){
		if(enable){
			specially.setEffect(EZSpeciallyEffectManager.Type.Selected);
		}else{
			specially.setEffect(EZSpeciallyEffectManager.Type.None);
		}
		
	}
	
	public function get mouseHandler():EZMouseHandler{
		return _mouseHander;
	}
	public function post(msg:String){
		this.fsm_.post(msg);
	}
	
	
	public function createTask(post:String,sft:EZStateForTask):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			this.fsm_.post(post);
			var enable:EZStateEnableTask = new EZStateEnableTask();
			sft.task = enable;
			TaskManager.PushBack(enable, function(){
				
				isOver = true;
			});
			TaskManager.Run(enable);
		};
		task.isOver = function():boolean{ return isOver;};
		
		return task;
	}
	
	public function attackTask():Task{
		var task:EZWaitTask = new EZWaitTask();
		task.setAllTime(_attackTime);
		TaskManager.PushFront(task, function(){
			this.fsm_.post("attack");
		});
		
		return task;
	}
	public function attackDBTask():Task{
		var task:Task = createTask("attack", attackState_);
		return task;
	}
	public function dieTask():Task{
		var task:Task = createTask("die", dieState_);
		return task;
	}	
	
	
	public function hurtDieTask():Task{
		var task:Task = createTask("hurtDie", hurtDieState_);
		return task;
	}
	
	public function winTask():Task{
		var task:Task = createTask("win", winState_);
		return task;
	}
	
	public function freeingTask(quality:int, type:Geek.MagicType):Task{
		ghost.setup(quality, type);
		var task:Task = createTask("freeing", freeingState_);
		return task;
	}
	
				
	public function provokeTask():Task{
		var task:Task = createTask("provoke", provokeState_);
		return task;
	
	}
	
	public function magicTask():Task{
		var task:EZWaitTask = new EZWaitTask();
		task.setAllTime(_magicTime);
		TaskManager.PushFront(task, function(){
			this.fsm_.post("magic");
		});
		
		return task;
	}
	
	
	
	
	public function reviveTask():Task{
	
		var task:Task = createTask("revive", reviveState_);
		return task;
	
	}
	
	public function hurtingTask(attack:PetSoundEffect.AttackType, defense:PetSoundEffect.DefenseType, effectType:EZHud.EffectType):Task{
		var task:Task = createTask("hurting", hurtingState_);
		TaskManager.PushFront(task, function(){
			Debug.LogWarning("hurtingTask hurtingTask hurtingTask");
			hud.effect(effectType);
			if(EZMonsterSound.GetInstance()){
				_actionSound = EZMonsterSound.GetInstance().getSoundByAttackTypes(attack, defense);
			};
		});
		return task;
	}
	
	
	public function medicalTask():Task{
		var task:EZWaitTask = new EZWaitTask();//createTask("medical", medicalState_);
		task.setAllTime(0.1);
		TaskManager.PushFront(task, function(){
			hud.effect(EZHud.EffectType.Medical);
			if(EZMonsterSound.GetInstance()){
				var sound:EZMonsterSound.Sound = EZMonsterSound.GetInstance().getSound(_soundType);
				_actionSound = sound.medical;
				_actionSound.play();
			}
		});
		return task;
	}
	public function hurtTask(attack:PetSoundEffect.AttackType, defense:PetSoundEffect.DefenseType,  effectType:EZHud.EffectType):Task{
		
		var task:Task = createTask("hurt", hurtState_);
		
		TaskManager.PushFront(task, function(){
			hud.effect(effectType);
			if(EZMonsterSound.GetInstance()){
				if(effectType == EZHud.EffectType.Dot){
					_actionSound = EZMonsterSound.GetInstance().getSound(_soundType).dot;
				}else if(effectType == EZHud.EffectType.Blood){
					_actionSound = EZMonsterSound.GetInstance().getSound(_soundType).blood;
				}else{
					_actionSound = EZMonsterSound.GetInstance().getSoundByAttackTypes(attack, defense);
				}
			}
		});
		return task;
	}
		
	
	public function collectTask(point:Vector3):Task{
		ghost.collectPoint = point;
		var task:Task = createTask("collect", collectState_);
		TaskManager.PushBack(task,function(){
			if(EZUIGhost.GetInstance()){
				EZUIGhost.GetInstance().addSoul(ghost.quality, ghost.magicType);
			}
			
		});
		return task;
	}
	
	
	
	
	public function Update(){
		this.fsm_.update(Time.deltaTime);
	}
	public function get body():EZSkeletal{
		return _body;
	}
	public function get specially():EZSpecially{
		if(_hudAndSpecially)
			return _hudAndSpecially.specially;
		return null;
	}
	
	public function get ghost():EZGhost{
		if(_hudAndSpecially)
		{
			return _hudAndSpecially.ghost;
		}
		return null;
	}
	public function get hud():EZHud{
		
		if(_hudAndSpecially)
			return _hudAndSpecially.hud;
		return null;
	}
	public function layoutingTask(layout:EZLayout, hFlip:boolean, layer:int):Task{
		var tl:TaskList = new TaskList();
		
		var wait:Task = new Task();
		wait.isOver = function():boolean{
			return (this.fsm_ != null);
			
		};
		tl.push(wait);
		
		
		var load:Task = _body.loadTask(layer);
		TaskManager.PushFront(load, 
		function(){
		
			loaded_ = false;
			this.post("loading");
			_body._layout = layout;
			_body._hFlip = hFlip;
		
		});
		
		
		TaskManager.PushBack(load, 
		function(){
		
			if(specially){
				specially.setTargetLayer(layer);
				specially.shadow = true;
			}
			if(hud)
				hud.load();
				
			
			loaded_ = true;
			this.post("loaded");
			
			
			scale_ =  _body.gameObject.transform.localScale;
			if(_attack){
				_attack.load();
				_flame.refresh(this.gameObject); 
				_flame.setMagicType(this._magicType);
			}
		
		});
		tl.push(load);
		return tl;
	}
	
	
	public function show(){
		_body.show();
		_body.pose("idle");
		_body.gameObject.transform.localScale = scale_;
		if(hud){
			hud.show();
		} 
		if(_flame){
			_flame.show();
		}
	}
	public function hide(){
		_body.hide();
		
		if(hud){
			hud.hide();
		}
		if(_flame){
			_flame.hide();
		}
	}
	
	
	


}