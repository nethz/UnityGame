#pragma strict
/*
class RPG  extends MonoBehaviour
{
	private var filter_:Filter = new Filter();
	private var fsm_:FSM = new FSM();
	private var context_:RPGStateContext = new RPGStateContext();
	
	
	public function fsm(){
		return fsm_;
	}
	
	public function Awake(){
		Debug.Log(this.gameObject.name + "!!@#$#$");
		TaskManager.registerTask("rpg.curtain", this.curtainTask);
		this.setup();
	}
	
	public function OnDestroy(){
		TaskManager.unregisterTask("rpg.curtain");
	}
	
	public function walk(){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "walk";
		this.fsm_.postEvent(evt);
	
	}
	public function idle(){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "idle";
		this.fsm_.postEvent(evt);
	
	}
	public function next(){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "next";
		this.fsm_.postEvent(evt);
	
	}
	public function setup(){
		 
		this.fsm_.addState("web", new RPGWebState(), "");
		this.fsm_.addState("next", new RPGNextState(), "");
		this.fsm_.addState("idle", new RPGIdleState(), "");
		this.fsm_.addState("walk", new RPGWalkState(), "");
		this.fsm_.addState("fight", new RPGFightState(), ""); 
		this.fsm_.addState("chance", new RPGChanceState(), "");
		
		fsm_.addState("fight.sort", new RPGSortState(this.context_), "fight");
		fsm_.addState("fight.attack", new RPGAttackState(this.context_), "fight");
		fsm_.addState("fight.dot", new RPGDotState(), "fight");
		fsm_.addState("fight.over", new RPGOverState(), "fight");
	
	}
	function Start() {
		this.fsm_.init("web");
	}
	

	function Update() {
		
		var d:float = this.filter_.interval(Time.deltaTime);
		this.fsm_.update(d);
		
	}
	

	

	function curtainTask(){
		var self = this;
		var i:int = 0;
		var task:Task = new Task();
		
		task.init = function(){
			ActionManager.Run("puzzle.curtain.show");
			self.next();
		};
		
		task.update = function(d:float){
			var self = this;
		};
		task.shutdown = function(){
			ActionManager.Run("puzzle.curtain.hide");
		};
		
		task.isOver = function(){
			var state:State = this.fsm_.getCurrState("idle") as State;
			return (state != null);
		};
		return task;
	}
}*/