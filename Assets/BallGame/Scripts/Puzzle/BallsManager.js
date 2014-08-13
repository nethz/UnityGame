#pragma strict

class BallsManager extends MonoBehaviour{
	private var impl_:BallsManagerImpl;
	private var fsm_:FSM = null;
	private var info_:RemoveInfo = new RemoveInfo();
	private var loaded_:boolean = false;
	public class Sound{
		public var moving:EZSound;
		public var locking:EZSound;
		public var unlock:EZSound;
		
	};
	public var _sound:BallsManager.Sound = null;
	function awake(){
		ActionManager.registerFunction("puzzle.ignore", this.ignore);
		ActionManager.registerFunction("puzzle.loaded", this.loaded);
		this.impl_ = new BallsManagerImpl();
		this.impl_.registerTask();
	}
	function onDestroy(){
		this.impl_.unregisterTask();
		ActionManager.unregisterFunction("puzzle.ignore");
		ActionManager.unregisterFunction("puzzle.loaded");
	
	}
	function start() {
		this.fsm_ = new FSM();
		this.fsm_.addState("user", new UserState(), ""); 
		this.fsm_.addState("moving", new MovingState(this.impl_), "");
		this.fsm_.addState("action", new ActionState(this.info_), "");
		this.fsm_.addState("group", new GroupState(), "action");
		this.fsm_.addState("remove", new RemoveState(info_), "action");
		this.fsm_.addState("fall", new FallState(), "action");
		this.fsm_.addState("curtain", new CurtainState(), "");
		this.fsm_.addState("loading", new PuzzleLoadingState(), "");
		if(loaded_){
			this.fsm_.init("curtain");
		}else{
			this.fsm_.init("loading");
		}
	}
	function readly() {
		return this.impl_.readly();
	}
	function init() {
		this.impl_.init();
	}
	function ignore() {
		var self = this;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "ignore";
		self.fsm_.postEvent(evt);
	
	}
	function loaded(){
		if(this.fsm_){
			var evt:FSMEvent = new FSMEvent();
			evt.msg = "loaded";
			this.fsm_.postEvent(evt);
		}
		loaded_ = true;
	}
	function locking(p:Vector2) {
		var self = this;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "locking";
		var ret:BallLock = null;
		evt.execute = function(){
			ret = self.impl_.locking(p); 
			_sound.locking.play();
		};
		self.fsm_.postEvent(evt);
		return ret;
		
	}
	
	function relocking(lk:BallLock, p:Vector2) {
		var self = this;
		var ret:BallLock = null;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "moving";
		evt.execute = function()
		{
			ret = self.impl_.relocking(lk, p); 
		};
		this.fsm_.postEvent(evt);
			
		return ret;
		
	}
	

	function unlock(lk:BallLock) {
	
		var self = this;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = 'unlock';
		evt.execute = function()
		{
			self.impl_.unlock(lk);
			_sound.unlock.play();
		};
		
		this.fsm_.postEvent(evt);
		
	}
	function createBall(x:int, y:int, view:BallBind) {
		return impl_.createBall(x, y, view);
	}
	function createBall(x:int, y:int, object:GameObject) {
		var view:BallBind = object.GetComponent(BallBind);
		return impl_.createBall(x, y, view);
	}
	function point2ball(p:Vector2) {
		return impl_.point2ball(p);
	}
	function addBall(x:int, y:int, ball:Ball) {
		this.impl_.addBall(x, y, ball);
	}
	function update(d:float) {
		this.fsm_.update(d);
		this.impl_.update(d);
	}
	function moving(lk:BallLock, p:Vector2) {	
		var self = this;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = "moving";
		evt.execute = function()
		{
			if(self.impl_.moving(lk, p)){
				_sound.moving.play();
			} 
		};
		this.fsm_.postEvent(evt);
	}

};