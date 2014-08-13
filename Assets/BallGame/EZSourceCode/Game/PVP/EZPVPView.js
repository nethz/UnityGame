#pragma strict

class EZPVPView extends EZView{
	
	public var _player : EZPlayer = null;
	public var _rival:EZPlayer = null;
	 
	static private var instance_:EZPVPView = null;
	
	public static function GetInstance():EZPVPView{
		return instance_;
	}
	public function Awake(){
		super.Awake();
		instance_ = this; 
		TaskManager.registerTask("view.swap", this.changeTask);
		TaskManager.registerTask("view.throw", this.throwTask);
		
		
		ActionManager.registerAction("view.pet.postEvent", this.postAction);
		
		ActionManager.registerFunction("view.input.enable", function(){
			//_foe.input.open();
			_player.pets.input.open();
			if(_rival.pets.input){
				_rival.pets.input.open();
			}
		});
		
		
		ActionManager.registerFunction("view.input.info", function(){
			//_foe.input.info();
			_player.pets.input.info();
			_rival.pets.input.info();
		});
		ActionManager.registerFunction("view.close.touch", function(){
			if(_player.battle){
				_player.battle.doOut();
			}
			if(_player.bag1){
				_player.bag1.doOut();
			}
			if(_player.bag2){
				_player.bag2.doOut();
			}
			
			if(_rival.battle){
				_rival.battle.doOut();
			}
			if(_rival.bag1){
				_rival.bag1.doOut();
			}
			if(_rival.bag2){
				_rival.bag2.doOut();
			}
		});
		ActionManager.registerFunction("view.input.disable", function(){
			//_foe.input.close();
			_player.pets.input.close();
			_rival.pets.input.close();
		
		});
		
		
	}
	public function OnDestroy(){
		ActionManager.unregisterFunction("view.input.enable");
		ActionManager.unregisterFunction("view.input.info");
		ActionManager.unregisterFunction("view.input.disable");
		ActionManager.unregisterFunction("view.close.touch");
		ActionManager.unregisterAction("view.pet.postEvent");
		//TaskManager.unregisterTask("view.effect");
		TaskManager.unregisterTask("view.swap");
		TaskManager.unregisterTask("view.throw");
	}

	
	public function throwTask():Task{
	
		var task:EZThrowTask = new EZThrowTask(_throwPrototype);
		var pc:Camera = PuzzleCamera.instance();
		var rc:Camera = RPGCamera.CameraInstance();
		TaskManager.PushFront(task,
			function(){
				task.begin = rc.ScreenToWorldPoint(pc.WorldToScreenPoint(task.original));
				if(task.seat == Seat.Hero){
					if(EZCrystalInGame.GetInstance()){
						var end:Vector3 =  rc.ScreenToWorldPoint(EZCrystalInGame.GetInstance().getScreenPosition());
						end.z = this.gameObject.transform.position.z;
						task.end = end;
					}
				}else{
			  		var pet:EZPet = getPet(task.seat); 
			  		if(pet){
			  			if(iPhone4){
							task.end = pet.body.gameObject.transform.position + _offset;
			  			}else{
							task.end = pet.body.gameObject.transform.position + _offset5;
			  			}
			  		}
		  		}
			}
		);
		
		
		return task;
	}
	
	public function changeTask():Task{
		var task:EZIDTask = new EZIDTask();
		task.init = function(){
			var swap:Task = null;
			switch(task.id){
				case Seat.WeBag1:
					swap = _player.battle.swapTask(_player.bag1);
					break;
				case Seat.WeBag2:
					swap = _player.battle.swapTask(_player.bag2);
					break;
				case Seat.FoeBag1:
					swap = _rival.battle.swapTask(_rival.bag1);
					break;
				case Seat.FoeBag2:
					swap = _rival.battle.swapTask(_rival.bag2);
					break;
			
			}
			if(swap){
				task.over = false;
				TaskManager.PushBack(swap, function(){task.over = true;});
				TaskManager.Run(swap);
			
			}else{
				task.over = true;
			}
		};
		TaskManager.PushBack(task, function(){
			_player.pets.bindAction();
		
		});
		
		return task;
	}
	public function getPet(id:int):EZPet{
		var container:EZViewContainer = this.getPetContainer(id);
		if(container != null){
			return container.pet;
		}
		
		return null;
	}
	public function getPetContainer(id:int):EZViewContainer{
		var container:EZViewContainer = null;
		switch(id){
			case Seat.WeBattle:
				container = _player.battle;
				break;
			case Seat.WeBag1:
				container = _player.bag1;
				break;
			case Seat.WeBag2:
				container = _player.bag2;
				break;
			case Seat.FoeBattle:
				container = _rival.battle;
				break;
			case Seat.FoeBag1:
				container = _rival.bag1;
				break;
			case Seat.FoeBag2:
				container = _rival.bag2;
				break;
		}
		return container;
	}
	
	public function postAction():ActionObj{
	
		var action:EZIDPostEventAction = new EZIDPostEventAction();
		action.execute = function(){
			if(action.id == EZView.Seat.Hero){
				_player.hero.post(action.msg);
			}else if(action.id == EZView.Seat.Rival){
				
				_rival.hero.post(action.msg);
			}else{
				var pet:EZPet = getPet(action.id);
				if(pet){
					pet.post(action.msg);
				}
			}
			
		};
		return action;
	}

	
}