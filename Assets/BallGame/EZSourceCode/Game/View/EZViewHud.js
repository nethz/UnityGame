#pragma strict

class EZViewHud extends MonoBehaviour{
	var _view:EZView;
	 
	public function Awake(){
	
		ActionManager.registerAction("view.hud.flicker", this.flickerAction);
		ActionManager.registerAction("view.hud.mp", mpAction);
		ActionManager.registerAction("view.hud.time", timeAction);
		ActionManager.registerAction("view.hud.bind", bindAction);
		ActionManager.registerAction("view.hud.hp", hpAction);
		ActionManager.registerAction("view.hud.speed", speedAction);
		ActionManager.registerAction("view.hud.text", textAction);
		ActionManager.registerAction("view.hud.number", numberAction);
		ActionManager.registerAction("view.hud.effect", effectAction);
		ActionManager.registerAction("view.hud.arrow", arrowAction);
		ActionManager.registerAction("view.hud.miss", missAction);
		TaskManager.registerTask("view.hud.pop.close", closePopTask);
		TaskManager.registerTask("view.hud.pop.we.close", closeWePopTask);
		
		
		TaskManager.registerTask("view.hud.pop.open", openPopTask);
	}
	
	public function OnDestroy(){
	
		TaskManager.unregisterTask("view.hud.pop.close");
		TaskManager.unregisterTask("view.hud.pop.we.close");
		TaskManager.unregisterTask("view.hud.pop.open");
		ActionManager.unregisterAction("view.hud.text");
		ActionManager.unregisterAction("view.hud.number");
		ActionManager.unregisterAction("view.hud.effect");
		ActionManager.unregisterAction("view.hud.mp");
		ActionManager.unregisterAction("view.hud.time");
		ActionManager.unregisterAction("view.hud.bind");
		ActionManager.unregisterAction("view.hud.hp");
		ActionManager.unregisterAction("view.hud.speed");
		ActionManager.unregisterAction("view.hud.flicker");
		ActionManager.unregisterAction("view.hud.arrow");
		ActionManager.unregisterAction("view.hud.miss");
	
	}
	public function closeWePopTask():Task{
		var task:EZOverTask = new EZOverTask();
		task.init = function(){
			task.over = false;
			var mt:MultiTask = new MultiTask();
			
			var battle:EZPet = this.getPet(EZSoul.Seat.WeBattle);
			if(battle && battle.hud){
				mt.push(battle.hud.pop.hideTask());
			}
			
			
			var bag1:EZPet = this.getPet(EZSoul.Seat.WeBag1);
			if(bag1 && bag1.hud){
				mt.push(bag1.hud.pop.hideTask());
			}
			
			
			var bag2:EZPet = this.getPet(EZSoul.Seat.WeBag2);
			if(bag2 && bag2.hud){
				mt.push(bag2.hud.pop.hideTask());
			}
			
			TaskManager.PushBack(mt, function(){
				task.over = true;
			});
			TaskManager.Run(mt);
		};
		
		return task;
	};
	public function closePopTask():Task{
		var task:EZOverTask = new EZOverTask();
		task.init = function(){
			task.over = false;
			var mt:MultiTask = new MultiTask();
			for(var seat:int = EZSoul.Seat.FighterBegin; seat < EZSoul.Seat.FighterEnd; ++seat){
				
				var pet:EZPet = this.getPet(seat);
				if(pet && pet.hud){
					mt.push(pet.hud.pop.hideTask());
				}
			}
			TaskManager.PushBack(mt, function(){
				task.over = true;
			});
			TaskManager.Run(mt);
		};
		
		return task;
	}
	public function openPopTask():Task{
		var task:EZIDPopTask = new EZIDPopTask();
		task.init = function(){
			task.over = false;
			var pet:EZPet = this.getPet(task.id);
			if(pet && pet.hud){
				var show:Task = pet.hud.pop.showTask(task.val, task.layer);
				TaskManager.PushBack(show, function(){
					task.over = true;
				});
				TaskManager.Run(show);
			}else{
				task.over = true;
			}
			
		};
		
		return task;
	}
	public function flickerAction():ActionObj{
		var action:EZIDFlickerAction = new EZIDFlickerAction();
		action.execute = function(){
		 	var pet:EZPet = getPet(action.id);
			if(pet){
				if(action.data.blood){
					pet.hud.hpBar.flicker();
				}
				if(action.data.speed){
					pet.hud.speedBar.flicker();
				}
				if(action.data.bindType != EZBindData.BindType.None){
					pet.hud.bind.flickerBind(action.data.bindType);
				}
				if(action.data.magicType != Geek.MagicType.None){
					pet.hud.bind.flickerMagic(action.data.magicType);
				}
			}
		};
		return action;
	
	}
	
	
	
	public function getPet(id:int):EZPet{
		return _view.getPet(id);
	}
	public function getPetContainer(id:int):EZViewContainer{
		return _view.getPetContainer(id);
	}

	public function missAction():ActionObj{
		var action:EZIDAction = new EZIDAction();
		action.execute = function(){
			Debug.LogWarning("miss++" + action.id);
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				TaskManager.Run(pet.hud.miss());
			}
		};
		return action;
	}
	public function arrowAction():ActionObj{
		var action:EZIDBoolAction = new EZIDBoolAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				pet.hud.arrow.isEnabled = action.val;
			}
		};
		return action;
	}

	public function mpAction():ActionObj{
		var action:EZIDMagicBarAction = new EZIDMagicBarAction();
		action.execute = function(){
			
			var container:EZViewContainer = this.getPetContainer(action.id);
			if(container && container.pet && container.pet.hud){
				container.pet.hud.mpBar.setValue(action.val, action.all);
				container.pet.hud.state.setState(action.state);
				if(container.pet.hud.mpBar.fulled && action.state == EZHudState.State.WeMagic){
					container.fullIt();
				}else{
					container.emptyIt();
				}
			}
		};
		return action;
	}
	
	public function speedAction():ActionObj{
		var action:EZIDListAction = new EZIDListAction();
		action.execute = function(){
			for(var i:int = 0; i<action.list.length; ++i){
				var pet:EZPet = getPet(action.list[i]);
				if(pet && pet.hud){
					pet.hud.speedBar.setValue(action.list.length - i, action.list.length);
				};
			}
			
		};
		return action;
	}
	
	public function textAction():ActionObj{
		var action:EZIDTextAction = new EZIDTextAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				 pet.hud.showText(action.text, action.color);
			};
		};
		return action;
	}
	public function numberAction():ActionObj{
		var action:EZIDNumberAction = new EZIDNumberAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				 pet.hud.showNumber(action.from, action.to, action.color, action.size);
			};
		};
		return action;
	}
	
	public function effectAction():ActionObj{
		var action:EZAttackEffectAction = new EZAttackEffectAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				pet.hud.effect(action.type);
			}
		};
		return action;
	}
	
	public function timeAction():ActionObj{
		var action:EZIDSetTimeAction = new EZIDSetTimeAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				pet.hud.state.setState(action.state);
				pet.hud.time.setValue(action.time);
				pet.hud.mpBar.setValue(action.val, action.all);
			};
		};
		return action;
	}
	
	
	public function bindAction():ActionObj{
		
		var action:EZIDBindAction = new EZIDBindAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				pet.hud.bind.execute(action.data, action.action);
				if(action.action == EZBindData.Action.Create){
					var color:Color = Color.white;
					switch(action.data.bindType){
					case EZBindData.BindType.MedicalDot:
					case EZBindData.BindType.MedicalBuff:
						color = Color.green;
					break;
					case EZBindData.BindType.AttackDot:
					case EZBindData.BindType.AttackBuff:
						color = Color.red;
					break;
					}
					pet.hud.showText(action.data.title, color);
				
				}
			};
		};
		return action;
	}

	public function hpAction():ActionObj{
		var action:EZIDSetHpAction = new EZIDSetHpAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				pet.hud.setHp(action.hp, action.ad, action.max);
			};
		};
		return action;
	}
	
	
}