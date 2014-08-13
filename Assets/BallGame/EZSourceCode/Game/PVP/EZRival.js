#pragma strict

class EZRival extends MonoBehaviour{
	public var _hero:EZHero;
	public var _pets:EZPets;
	
	public var _layout:EZLayout;
	
	public function get battle():EZPetBattle{
		return _pets.battle;
	}
	
	public function get bag1():EZPetBag{
		return _pets.bag1;
	}
	
	public function get bag2():EZPetBag{
		return _pets.bag2;
	}
	public function get hero():EZHero{
		return _hero;
	}
	public function get pets():EZPets{
		return _pets;
	}

	public function loadTask():Task{
		var task:EZPlayerLoaderTask = new EZPlayerLoaderTask();
		var isOver:boolean = false;
		task.init = function(){
			Debug.LogWarning("scene");
			isOver = false;
			var tl:TaskList = new TaskList();
			_hero = EZHeroFactories.GetInstance().create(task.player, this.transform, "body");
			
			var layouting:Task = _hero.layoutingTask(_layout, false, this.gameObject.layer);
			tl.push(layouting);
			var load:Task = _pets.loadTask(task.battle, task.bag1, task.bag2);
			tl.push(load);
			TaskManager.PushBack(tl, function(){
				_hero.body.flipHorizintal(true);
				isOver = true;
			});
			TaskManager.Run(tl);
		
		};
		task.shutdown = function(){
			//EZHeroFactories.Release();
		};
		task.isOver = function():boolean{
			return isOver;
		};
		
		return task;
	}
	
	public function Awake(){
		
		TaskManager.registerTask("view.rival.loader", this.loadTask);
		TaskManager.registerTask("view.rival.walk", this.walkTask);
		TaskManager.registerTask("view.rival.fighting", this.fightingTask);
		TaskManager.registerTask("rpg.rival.peace", this.peaceTask);
		
		
	}
	public function OnDestroy(){
		TaskManager.unregisterTask("view.rival.loader");
		TaskManager.unregisterTask("view.rival.walk");
		TaskManager.unregisterTask("view.rival.fighting");
		TaskManager.unregisterTask("rpg.rival.peace");
	}
	
	public function fightingTask():EZFighterTask{
		
		return _pets.fighterTask();;
		
	} 
	
	public function peaceTask():Task{
	 	var tl:TaskList = new TaskList();
		var task:Task = _pets.peaceTask();
		tl.push(task);
		return tl;
		
	}
	public function walkOver(task:EZWalkTask){
		task.over = true;
	}
	public function walkTask():EZWalkTask{
		
		var task:EZWalkTask = new EZWalkTask();
		var tp:TweenAbsPosition = null;
		task.move = function(m:Vector3):Vector3{
			task.setTarget(m + this.transform.position);
		};
		task.init = function(){
			task.over = false;
			var target:Vector3 = task.target;
			tp = TweenAbsPosition.Begin(this.gameObject, task.time, target);
			
			tp.method = task.method;
		};
		
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		
		TaskManager.PushFront(task,function(){
			var evt:FSMEvent = new FSMEvent();
			evt.msg = "walk";
			this._hero.postEvent(evt);
		});
		
		TaskManager.PushBack(task, function(){
			var evt:FSMEvent = new FSMEvent();
			evt.msg = "idle";
			this._hero.postEvent(evt);
		});
		
		//mt.push(task);
		
		return task;
	}
};