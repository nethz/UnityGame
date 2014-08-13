#pragma strict

class EZBallsManager extends MonoBehaviour{
	public var _impl:EZBallsManagerImpl;
	public var _downDialog:EZGameDialogView = null;
//	public var _downDialogTexts:String[] = null;
	
	
	private var fsm_:FSM = null;
	//public var _lead:EZLead = null;
	private var info_:EZRemoveInfo = new EZRemoveInfo();
	public var _loaded:boolean = false;
	public var _ctrl:EZBallCtrl = null;
	public var _balls:EZBallsMultiArray;
	private var filter_:Filter = null;
	
	
	
	public class Sound{
		public var moving:EZSound;
		public var locking:EZSound;
		public var unlock:EZSound;
	};
	public var _sound:EZBallsManager.Sound = null;
	function Awake(){
	
		this.filter_ = new Filter();
		ActionManager.registerFunction("puzzle.ignore", this.ignore);
		ActionManager.registerFunction("puzzle.loaded", this.loaded);
	}
	function OnDestroy(){
		//this.impl_.unregisterTask();
		ActionManager.unregisterFunction("puzzle.ignore");
		ActionManager.unregisterFunction("puzzle.loaded");
	
	}
	function start() {
		this.fsm_ = new FSM();
		this.fsm_.addState("user", new EZUserState(), ""); 
		this.fsm_.addState("moving", new EZMovingState(this._impl), "");
		this.fsm_.addState("action", new EZActionState(_ctrl, this.info_), "");
		this.fsm_.addState("group", new EZGroupState(_ctrl), "action");
		this.fsm_.addState("remove", new EZRemoveState(_ctrl, info_), "action");
		this.fsm_.addState("fall", new EZFallState(), "action");
		this.fsm_.addState("curtain", new EZCurtainState(_ctrl, this._impl), "");
		this.fsm_.addState("loading", new EZPuzzleLoadingState("curtain"), "");
		this.fsm_.addState("game_over", new EZGameGuideOverState(_ctrl, this._impl), "");
		if(EZLeadManager.GetInstance()){
			this.fsm_.addState("lead_moving", new EZLeadMovingState(_impl), "");
			this.fsm_.addState("lead_in_user", new EZLeadInUserState(_impl), ""); 
			this.fsm_.addState("lead_user", new EZLeadUserState(_impl), ""); 
			this.fsm_.addState("lead_dialog", new EZLeadDownDialogState(_downDialog, _impl), "");
			this.fsm_.addState("lead_in_group", new EZLeadInGroupState(_impl), "action");
			this.fsm_.addState("lead_group", new EZLeadGroupState(_ctrl, _impl), "action");
			this.fsm_.addState("lead_back", new EZLeadBackState(_impl), "action");
			this.fsm_.addState("lead_remove", new EZLeadRemoveState(_ctrl, info_), "action");
			this.fsm_.addState("lead_fall", new EZLeadFallState(), "action");
		}
		
		
	/*	
		if(EZLeadManager.GetInstance() && EZLeadManager.GetInstance().leadPuzzle()){
			if(_loaded ){
				this.fsm_.init("lead_curtain");
			}else{
				this.fsm_.init("lead_loading");
			} 
		}else{*/
		if(_loaded){
			this.fsm_.init("curtain");
		}else{
			this.fsm_.init("loading");
		}  
		//}
		
	}
	
	function goOver(){
		this.fsm_.post("game_over");
	}
	
	function gameOver():boolean{
		return _impl.isAllOver();
	}
	function readly() {
		return this._impl.readly();
	}
	function init() {
		this._impl.init();
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
		_loaded = true;
	}
	function locking(position:Vector2) {
		var evt:LockingEvent = new LockingEvent();
		evt.xy =  _impl.point2ball2cell(position);
		evt.msg = "locking";
		var ret:EZBallLock = null;
		evt.execute = function(){
			ret = this._impl.locking(position); 
			if(_sound && _sound.locking){
				_sound.locking.play();
			}
			
		};
		this.fsm_.postEvent(evt);
		return ret;
		
	}
	
	function relocking(lk:EZBallLock, p:Vector2) {

		var ret:EZBallLock = null;
		var evt:FSMEvent = new FSMEvent();
		evt.msg = 'relocking';
		evt.execute = function(){
			ret = this._impl.relocking(lk, p); 
		};
		this.fsm_.postEvent(evt);
			
		return ret;
		
	}
	

	function unlock(lk:EZBallLock) {
	
		var self = this;
		var evt:LockingEvent = new LockingEvent();
		var xy:Vector2 = lk.getXY();
		evt.msg = 'unlock';
		evt.execute = function()
		{
			self._impl.unlock(lk);
			if(_sound && _sound.unlock){
				_sound.unlock.play();
			}
		};
		
		this.fsm_.postEvent(evt);
		
	}
	
	function point2ball(p:Vector2) {
		return _impl.point2ball(p);
	}
	function addBall(x:int, y:int, ball:EZBall) {
		this._impl.addBall(x, y, ball);
	}
	public function Update(){
		var time:float = this.filter_.interval(Time.deltaTime);
		this.fsm_.update(time);
		this._impl.update(time, _balls.width, _balls.height);
	
	}
	
	function moving(lk:EZBallLock, p:Vector2) {	
		
		var evt:FSMEvent = new FSMEvent();
		evt.msg = 'moving';
		evt.execute = function(){
			if(this._impl.moving(lk, p)){ 
				if(_sound && _sound.moving){ 
					_sound.moving.play();
				}
			} 
		};
		this.fsm_.postEvent(evt);
	}

}