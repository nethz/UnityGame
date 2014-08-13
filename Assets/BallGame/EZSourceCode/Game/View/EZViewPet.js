#pragma strict

class EZViewPet extends MonoBehaviour{
	var _view:EZView;
	class Flicker{
		public var _id:int = 0;
		public var _enable:boolean = false;
		public var _layer:int = -1;
		function Flicker(id:int, enable:boolean, layer:int){
			_id = id;
			_enable = enable;
			_layer = layer;
		}
		function print(){
			Debug.LogWarning("!"+ _id +_enable +_layer );
		}
	}
	public function Awake(){

		TaskManager.registerTask("view.pet.attack", this.attackTask);
		TaskManager.registerTask("view.pet.crystal", this.crystalTask);
		TaskManager.registerTask("view.pet.die", this.dieTask);
		TaskManager.registerTask("view.pet.freeing", this.freeingTask);
		TaskManager.registerTask("view.pet.hurt", this.hurtTask);
		TaskManager.registerTask("view.pet.hurting", this.hurtingTask);
		TaskManager.registerTask("view.pet.magic", this.magicTask);
		TaskManager.registerTask("view.pet.provoke", this.provokeTask);
		TaskManager.registerTask("view.pet.revive", this.reviveTask);
		
		TaskManager.registerTask("view.pet.win", this.winTask);
		
		
		ActionManager.registerAction("view.pet.touch", this.doTouch);
		ActionManager.registerAction("view.pet.out", this.doOut);
		ActionManager.registerAction("view.pet.feedback", this.feedback);
		ActionManager.registerAction("view.pet.selected", this.selectedAction);
		//ActionManager.registerAction("view.pet.flicker", this.flickerAction);
		ActionManager.registerAction("view.pet.state", this.stateAction);
		
	
		
		
	}
	
	public function OnDestroy(){
	
	
	
		TaskManager.unregisterTask("view.pet.attack");
		TaskManager.unregisterTask("view.pet.crystal");
		TaskManager.unregisterTask("view.pet.die");
		TaskManager.unregisterTask("view.pet.freeing");
		TaskManager.unregisterTask("view.pet.hurt");
		TaskManager.unregisterTask("view.pet.hurting");
		TaskManager.unregisterTask("view.pet.magic");
		TaskManager.unregisterTask("view.pet.provoke");
		TaskManager.unregisterTask("view.pet.revive");
		TaskManager.unregisterTask("view.pet.win");
		
		
		ActionManager.unregisterAction("view.pet.selected");
		ActionManager.unregisterAction("view.pet.state");
		ActionManager.unregisterAction("view.pet.touch");
		ActionManager.unregisterAction("view.pet.out");
		ActionManager.unregisterAction("view.pet.feedback");
	
	}

	
	public function getPet(id:int):EZPet{
		return _view.getPet(id);
	}
	public function getPetContainer(id:int):EZViewContainer{
		return _view.getPetContainer(id);
	}
	public function dieTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
			if(pet){
				var die:Task = pet.dieTask();
				task.over = false;
				TaskManager.PushFront(die, function(){
					pet.selected(false);
					});
				TaskManager.PushBack(die, function(){
					task.over = true;
					});
				TaskManager.Run(die);
			}else{
				task.over = true;
			}
		}; 
		return task;
	}
	
	
	public function provokeTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
			if(pet){
				var provoke:Task = pet.provokeTask();
				task.over = false;
				TaskManager.PushBack(provoke, function(){task.over = true;});
				TaskManager.Run(provoke);
			}else{
				task.over = true;
			}
		}; 
		return task;
	}
	
	public function freeingTask():Task{
		var task:EZIDDropTask = new EZIDDropTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
			if(pet){
				task.over = false;
				var freeing:Task = pet.freeingTask(task.quality, task.magicType);
				TaskManager.PushBack(freeing, function(){task.over = true;});
				TaskManager.Run(freeing);
			}else{
				task.over = true;
			}
		}; 
		return task;
	}
	
	
	
	
	public function attackTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
			if(pet){
				var attack:Task = pet.attackTask();
				
				task.over = false;
				TaskManager.PushBack(attack, function(){task.over = true;});
				TaskManager.Run(attack);
			}else{
				task.over =true;
			}
		}; 
		return task;
	}
	
	
	
	public function magicTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
			if(pet){
				var attack:Task = pet.magicTask();
				task.over = false;
				TaskManager.PushBack(attack, function(){task.over = true;});
				TaskManager.Run(attack);
			}else{
				task.over =true;
			}
		}; 
		return task;
	}
	
	public function crystalTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
			if(pet){
				var provoke:Task = pet.provokeTask();
				task.over = false;
				TaskManager.PushBack(provoke, function(){task.over = true;});
				TaskManager.Run(provoke);
			}else{
				task.over =true;
			}
		}; 
		return task;
	}
	
	public function reviveTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
			if(pet){
				var revive:Task = pet.reviveTask();
				task.over = false; 
				
				TaskManager.PushFront(revive, function(){ 
					if(pet.hud){ 
						pet.hud.bind.clear();
						pet.hud.hpBar.setValue(1, 0, 1);
					}
				});
				
				
				TaskManager.PushBack(revive, function(){ 
					task.over = true;
				});
				TaskManager.Run(revive);
			}else{
				task.over =true;
			}
		}; 
		return task;
	}
	
	public function hurtTask():Task{
		var task:EZIDHurtTask = new EZIDHurtTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
		  	var from:EZPet = getPet(task.attackSeat);
		  	var attack:PetSoundEffect.AttackType = PetSoundEffect.AttackType.Nomal;
		  	if(from){
		  		attack = from.attackType();
		  	}
			if(pet){
				var act:Task = null;
				if(task.hurtType == EZHud.EffectType.Medical){
					act = pet.medicalTask();
				}else{
					act = pet.hurtTask(attack, pet.defenseType(), task.hurtType);
				}
				task.over = false;
				TaskManager.PushBack(act, function(){task.over = true;});
				TaskManager.Run(act);
					
			}else{
				task.over =true;
			}
		}; 
		return task;
	}
	
	public function hurtingTask():Task{
		var task:EZIDHurtTask = new EZIDHurtTask();
		task.init = function(){
		  	var pet:EZPet = getPet(task.id);
		  	var from:EZPet = getPet(task.attackSeat);
		  	var attack:PetSoundEffect.AttackType = PetSoundEffect.AttackType.Nomal;
		  	if(from){
		  		attack = from.attackType();
		  	}
			if(pet){
				var hurt:Task = pet.hurtingTask(attack, pet.defenseType(), task.hurtType);
				task.over = false;
				TaskManager.PushBack(hurt, function(){task.over = true;});
				TaskManager.Run(hurt);
			}else{
				task.over =true;
			}
		}; 
		return task;
	}
	
	
	public function flickerMessage(p:EZViewPet.Flicker){
		var pet:EZPet = getPet(p._id);
		p.print();
		if(pet){
			pet.flicker(p._enable, p._layer);
		}
	}

	public function selectedAction():ActionObj{
		Debug.Log("selected");
		var action:EZIDBoolAction = new EZIDBoolAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet){
				pet.selected(action.val);
			}
		};
		
		return action;
	
	}

	public function stateAction():ActionObj{
		var action:EZIDSetBindDataAction = new EZIDSetBindDataAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet){
				pet.setBindData(action.data);
			}
			
			
			
		};
		return action;
	
	}
	public function winTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
			var pet:EZPet = getPet(task.id);
			if(pet){
				var win:Task = pet.winTask();
				task.over = false;
				TaskManager.PushBack(win, function(){task.over = true;});
				TaskManager.Run(win);
			}else{
				task.over = true;
			}
		};
		
		return task;
	}
	
	
	
	public function missAction():ActionObj{
		var action:EZIDAction = new EZIDAction();
		action.execute = function(){
			var pet:EZPet = getPet(action.id);
			if(pet && pet.hud){
				TaskManager.Run(pet.hud.miss());
			}
		};
		return action;
	}
	
	
	public function doTouch():ActionObj{
		var action:EZIDAction = new EZIDAction();
		action.execute = function(){
			var container:EZViewContainer = getPetContainer(action.id);
			if(container){
				container.doTouch();
			}
		};
		return action;
	}
	
	public function feedback():ActionObj{
		var action:EZIDColorAction = new EZIDColorAction();
		action.execute = function(){
			var container:EZViewContainer = getPetContainer(action.id);
			if(container){
				container.feedback(action.color);
			}
		};
		return action;
	}
	
	
	
	public function doOut():ActionObj{
		var action:EZIDAction = new EZIDAction();
		action.execute = function(){
			var container:EZViewContainer = getPetContainer(action.id);
			if(container){
				container.doOut();
			}
			
		};
		return action;
	}
	
	
}