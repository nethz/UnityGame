#pragma strict

class EZCardTeamGuide extends MonoBehaviour{
	class GuideStartState extends StateWithEventMap{
		public function GuideStartState(){
			addEvent("enable", "enable");
			addEvent("main", "main");
		}
	}
	class GuideOverState extends State{
		
	}
	class GuideState extends State{
	
		var _state:String = "state";
		var _pop:EZPopPosition = null;
		var _text:String = "text";
		var _input:EZUIInputSwitch = null;
		private var nextState_:String = "";
		private var goto_:boolean = false;
		private var gotoState_:String = "";
		public function GuideState(){
		
		}
		public function start(){ 
			goto_ = false;
			gotoState_ = "";
			Debug.LogWarning(_state);
			nextState_ = "";
			var task:Task = _pop.showTask(_text);
			TaskManager.PushFront(task, function(){
				_input.close();
			});
			TaskManager.PushBack(task, function(){
				_input.open();
			});
			TaskManager.Run(task);
		}
		public function hideTask():Task{
			var task:Task = _pop.hideTask();
			TaskManager.PushFront(task, function(){
				_input.close();
			});
			TaskManager.PushBack(task, function(){
				_input.open();
			});
			return task;
		}
		function postEvent(evt:FSMEvent):String
		{
		
			
			Debug.LogWarning("postEvent:" + evt.msg);
			if(evt.msg == _state){
				return "";
			}
			switch(evt.msg){
				case "over":
					TaskManager.Run(this.hideTask());
					return "over";
					break;
				case "enable":
				case "main":
				case "battle":
				case "bag1":
				case "bag2":
					gotoState_ = evt.msg;
					if(goto_ == false){
						goto_ = true;
						var task:Task = this.hideTask();
						TaskManager.PushBack(task, function(){
							nextState_ = gotoState_; 
						});
						TaskManager.Run(task);
					}
					
					break;
			
			}
			
			return "";
		}
		public function update(d:float):String{
			return nextState_;
		}
	}
	public var _main:GuideState = null;
	public var _enable:GuideState = null;
	public var _battle:GuideState = null;
	public var _bag1:GuideState = null;
	public var _bag2:GuideState = null;
	private var fsm_:FSM = null;
	public function init(){
		fsm_ = new FSM();
		fsm_.addState("start", new GuideStartState(), "");
		fsm_.addState("enable", _enable, "");
		fsm_.addState("main", _main, "");
		fsm_.addState("battle", _battle, "");
		fsm_.addState("bag1", _bag1, "");
		fsm_.addState("bag2", _bag2, "");
		fsm_.addState("over", new GuideOverState(), "");
		fsm_.init("enable");
		
	} 
	public function Update(){ 
		if(fsm_){
			fsm_.update(Time.deltaTime);
		}
		
	}
	public function over(){
		if(fsm_){ 
			fsm_.post("over");
		}	
	}
	public function post(msg:String){
		if(fsm_){
			fsm_.post(msg);
		}
	
	}

}