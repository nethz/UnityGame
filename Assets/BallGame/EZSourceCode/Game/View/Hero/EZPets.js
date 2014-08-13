#pragma strict

class EZPets extends MonoBehaviour{
	public var _battle:EZPetBattle;
	public var _bag1:EZPetBag;
	public var _bag2:EZPetBag;
	public var _input:EZInput;
	
	
	private var battleEnable_:boolean = true;
	private var bag1Enable_:boolean = true;
	private var bag2Enable_:boolean = true;
	
	
	public function get input():EZInput{
		return _input;
	}
	
	public function loadTask(battle:Geek.SoulKey, bag1:Geek.SoulKey, bag2:Geek.SoulKey){
		
		var tl:TaskList = new TaskList();
		var battleTask:Task = _battle.loadTask(battle);
		TaskManager.PushBack(battleTask, function(){
			_battle.pet.hide();
		});
		
		
		var bag1Task:Task = _bag1.loadTask(bag1);
		TaskManager.PushBack(bag1Task, function(){
			_bag1.pet.hide();
		});
		
		var bag2Task:Task = _bag2.loadTask(bag2);
		TaskManager.PushBack(bag2Task, function(){
			_bag2.pet.hide();
		});
		
		tl.push(battleTask);
		tl.push(bag1Task);
		tl.push(bag2Task);
	
		
		
		TaskManager.PushBack(tl, function(){
			if(_input){
				_input.reset = bindAction;
			}
		});
		
		
		
		return tl;
	
	}
	
	public function bindAction(){
		if(_battle.pet.mouseHandler){
			_battle.pet.mouseHandler.press = function(state:boolean){
				if(_battle.pet.weakup){
					_input.onPress("Battle", state);
				}
			};
		}
		
		if(_bag1.pet.mouseHandler){
			_bag1.pet.mouseHandler.press = function(state:boolean){
			
				if(_bag1.pet.weakup){
					_input.onPress("Bag1", state);
				}
			};
		}
		
		if(_bag2.pet.mouseHandler){
			_bag2.pet.mouseHandler.press = function(state:boolean){
				if(_bag2.pet.weakup){
					_input.onPress("Bag2", state);
				}
			};
		}
	}
	public function get battle():EZPetBattle{
	
		if(!battleEnable_){
			return null;		
		}
		
		return _battle;
	}
	
	public function get bag1():EZPetBag{
		if(!bag1Enable_){
			return null;		
		}
		
		return _bag1;
	}
	
	public function get bag2():EZPetBag{
		if(!bag2Enable_){
			return null;		
		}
		
		return _bag2;
	}
	public function show(){
		if(battleEnable_){
			_battle.pet.show();
		}
		if(bag1Enable_){
			_bag1.pet.show();
		}
		if(bag2Enable_){
			_bag2.pet.show();
		}
	}
	public function fighterTask():Task{
		var fighter:EZFighterTask = new EZFighterTask();
		fighter.init = function(){
			battleEnable_ = fighter.battle;
			bag1Enable_ = fighter.bag1;
			bag2Enable_ = fighter.bag2;
			this.show();
		};
		return fighter;
	}
	public function hide(){
		if(battleEnable_){
			_battle.pet.hide();
		}
		if(bag1Enable_){
			_bag1.pet.hide();
		}
		if(bag2Enable_){
			_bag2.pet.hide();
		}
	}
	public function peaceTask():Task{
		var task:Task = new Task();
		task.init = function(){
			this.hide();
		};
		return task;
	}
	
	
	

}