#pragma strict

class EZFoe extends MonoBehaviour{

	/*class Team{
		public var battle:EZPetBattle;
		public var bag1:EZPetBag;
		public var_bag2:EZPetBag;
	};*/
	public var _battle:EZFoeBattle;
	public var _bag1:EZFoeBag;
	public var _bag2:EZFoeBag;
	public var _space:Vector3 = Vector3(200, 0, 0);
	public var _input:EZFoeInput;
	

	
	public function get input():EZFoeInput{
		return _input;
	}
	
	public function get battle():EZFoeBattle{
		return _battle;
	}
	
	public function get bag1():EZFoeBag{
		return _bag1;
	}
	
	public function get bag2():EZFoeBag{
		return _bag2;
	}
	
	public function loadTaskImpl(battle:Geek.SoulKey, bag1:Geek.SoulKey, bag2:Geek.SoulKey, pos:float):Task{
		var mt:MultiTask = new MultiTask();
		var position:Vector3 =  _space * pos;
		TaskManager.PushFront(mt, function(){
			this.gameObject.transform.position.x = 0; 
		});
		mt.push(_battle.loadTask(battle));
		mt.push(_bag1.loadTask(bag1));
		mt.push(_bag2.loadTask(bag2));
		
		TaskManager.PushBack(mt, function(){
			this.gameObject.transform.position.x = position.x; 
	 		 _battle.pet.show();
	 		 _bag1.pet.show();
	 	 	 _bag2.pet.show();
	 	 	 _input.reset = bindAction;
		});
		
		return mt;
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
	
	public function preloadeTask():Task{
		var task:EZFoePreloaderTask = new EZFoePreloaderTask();
		var isOver:boolean = true;
		task.init = function(){
		
			isOver = false;
			var mt:MultiTask = new MultiTask();
			mt.push(_battle.preloadeTask(task.battle));
			mt.push(_bag1.preloadeTask(task.bag1));
			mt.push(_bag2.preloadeTask(task.bag2));
			TaskManager.PushBack(mt, function(){
				isOver = true;
			});
			
			TaskManager.Run(mt);
			isOver = true;
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	public function loadTask():Task{
		var task:EZFoeLoaderTask = new EZFoeLoaderTask();
		var isOver:boolean = false;
		task.init = function(){
			var load:Task = this.loadTaskImpl(task.battle, task.bag1, task.bag2, task.position);
			TaskManager.PushBack(load, function(){
				isOver = true;
			});
			TaskManager.Run(load);
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}
	
	public function selectedReset(){
		_bag1.pet.selected(false);
		_bag2.pet.selected(false);
		_battle.pet.selected(false);
	}
	public function selectedAction():ActionObj{
		var action:EZIDAction = new EZIDAction();
		
			
		action.execute = function(){
			switch(action.id){
			case EZView.Seat.FoeBag1:
				_bag1.pet.selected(true);
				break;
			case EZView.Seat.FoeBag2:
				_bag2.pet.selected(true);
				break;
			case EZView.Seat.FoeBattle:
				_battle.pet.selected(true);
				break;
			}
			
		};
		return action;
	}
	
	public function collectTask():Task{
		
		var isOver:boolean = false;
		var task:Task = new Task();
		
		task.init = function(){
			var rc:Camera = RPGCamera.CameraInstance();
			var p:Vector3 = rc.ViewportToWorldPoint(Vector3(1,1, 0));// + rc.transform.position;
			var mt:MultiTask = new MultiTask();
			mt.push(_battle.pet.collectTask(p));
			mt.push(_bag1.pet.collectTask(p));
			mt.push(_bag2.pet.collectTask(p));
			TaskManager.PushBack(mt, function(){isOver = true;});
			TaskManager.Run(mt);
		};
		
		task.isOver = function(){
			return isOver;
		};

		
		return task;
	
	}
	public function Awake(){
		TaskManager.registerTask("view.foe.preloader", this.preloadeTask);
		TaskManager.registerTask("view.foe.loader", this.loadTask);
		TaskManager.registerTask("view.foe.collect", this.collectTask);
		ActionManager.registerAction("view.foe.selected", this.selectedAction);
		ActionManager.registerFunction("view.foe.selected.reset", this.selectedReset);
	}
	public function OnDestroy(){
	
		TaskManager.unregisterTask("view.foe.collect");
		TaskManager.unregisterTask("view.foe.loader");
		TaskManager.unregisterTask("view.foe.preloader");
		ActionManager.unregisterAction("view.foe.selected");
		ActionManager.unregisterFunction("view.foe.selected.reset");
	}

}