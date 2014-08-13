#pragma strict

class EZPVEView extends EZView{
	/*enum Seat{
		WeBattle = 0,
		WeBag1 = 1,
		WeBag2 = 2,
		FoeBattle = 3,
		FoeBag1 = 4,
		FoeBag2 = 5,
		Hero = 6,
		Rival = 7,
		All = 8,
		None = 9,
	};*/
	//public var _offset:Vector3 = Vector3.zero;
	//public var _offset5:Vector3 = Vector3.zero;
//	public var _throwPrototype:GameObject;
	public var _player : EZPlayer = null;
	public var _foe:EZFoe = null;
	 
	static private var instance_:EZPVEView = null;
	
	public static function GetInstance():EZPVEView{
		return instance_;
	}
	public function Awake(){
		super.Awake();
		instance_ = this; 
		TaskManager.registerTask("view.swap", this.changeTask);
		TaskManager.registerTask("view.throw", this.throwTask);
		
		
		ActionManager.registerAction("view.pet.postEvent", this.postAction);
		
		ActionManager.registerFunction("view.input.enable", function(){
			_foe.input.open();
			_player.pets.input.open();
		});
		
		
		ActionManager.registerFunction("view.input.info", function(){
			_foe.input.info();
			_player.pets.input.info();
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
			
			
			if(_foe.battle){
				_foe.battle.doOut();
			}
			if(_foe.bag1){
				_foe.bag1.doOut();
			}
			if(_foe.bag2){
				_foe.bag2.doOut();
			}
		});
		ActionManager.registerFunction("view.input.disable", function(){
			_foe.input.close();
			_player.pets.input.close();
			
		});
		
		
	}
	public function OnDestroy(){
		ActionManager.unregisterFunction("view.input.enable");
		ActionManager.unregisterFunction("view.input.info");
		ActionManager.unregisterFunction("view.input.disable");
		ActionManager.unregisterFunction("view.close.touch");
		ActionManager.unregisterAction("view.pet.postEvent");
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
					swap = _foe.battle.swapTask(_foe.bag1);
					break;
				case Seat.FoeBag2:
					swap = _foe.battle.swapTask(_foe.bag2);
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
				container = _foe.battle;
				break;
			case Seat.FoeBag1:
				container = _foe.bag1;
				break;
			case Seat.FoeBag2:
				container = _foe.bag2;
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