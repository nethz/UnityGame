#pragma strict

class EZHero extends MonoBehaviour {
	public var _isGuide:boolean = false;
	public var _body:EZSkeletal = null;
	public var _specially:EZSpecially = null;
	private var fsm_:FSM = null;
	
	
	public var _walkSound:EZSound = null;
	public var _winSound:EZSound = null;
	
	private var loaded_:boolean = false;
	public function get specially():EZSpecially{
		return _specially;
	}
	public function get body():EZSkeletal{
		return _body;
	}
	public function post(msg:String){
		if(this.fsm_)
			this.fsm_.post(msg);
	}
	public function animation(name:String, sound:EZSound):EZAnimationTask{
		var anim:Task = _body.createAnimationTask(name);
		if(sound != null){
		
			TaskManager.PushFront(anim, function(){
				sound.play();
			});
		 	TaskManager.PushBack(anim, function(){
				sound.stop();
			});
		}
		
		return anim;
	}
	public function Start(){
		this.fsm_ = new FSM();
		this.fsm_.addState("loading", new EZHeroLoadingState(_isGuide),"");
		this.fsm_.addState("idle", new EZHeroIdleState(animation("idle", null)),"");
		this.fsm_.addState("walk", new EZHeroWalkState(animation("walk", _walkSound)),"");
		this.fsm_.addState("win", new EZHeroWinState(animation("win", _winSound)),"");
		this.fsm_.addState("stop", new EZHeroStopState(_body),"");
		if(loaded_){
			if(_isGuide){
				this.fsm_.init("stop");
			}else{
				this.fsm_.init("idle");
			}
		}else{
			this.fsm_.init("loading");
		}
		
	}
	public function load(onEnd:Function){
		var task:Task = _body.loadTask(this.gameObject.layer);
		TaskManager.PushBack(task, function(){
			_body.show();
			_specially.shadow = true;
			this.post("loaded");
			loaded_ = true;
			onEnd();
		});
		TaskManager.Run(task);
		
	}
	public function layoutingTask(layout:EZLayout, hFlip:boolean, layer:int):Task{
		_body._layout = layout;
		_body._hFlip = hFlip;
		var load:Task = _body.loadTask(layer);
		TaskManager.PushFront(load, function(){
		
			loaded_ = false;
		
		});	
		
		TaskManager.PushBack(load, function(){
			if(_specially){
				_specially.setTargetLayer(layer);
				_specially.shadow = true;
			}
			_body.show();
			loaded_ = true;
			this.post("loaded");
		
		});
		return load;
		/*
		this.post("loading");
		_body._layout = layout;
		_body._hFlip = hFlip;
		_body.load(layer, function(){
			if(_specially){
				_specially.setTargetLayer(layer);
				_specially.shadow = true;
			}
			_body.show();
			loaded_ = true;
			this.post("loaded");
			onEnd();
		});*/
	}
	
	private function layouting(layout:EZTableLayout, hFlip:boolean, layer:int, onEnd:Function){
		/*
		loaded_ = false;
		this.post("loading");
		_body._layout = layout;
		_body._hFlip = hFlip;
		_body.load(layer, function(){
			if(_specially){
				_specially.setTargetLayer(layer);
				_specially.shadow = true;
			}
			_body.show();
			loaded_ = true;
			this.post("loaded");
			onEnd();
		});*/
	}
	
	
	public function postEvent(evt:FSMEvent){
		if(this.fsm_)
			this.fsm_.postEvent(evt);
	}
	public function OnDestroy(){
	} 
	public function Update(){
		if(fsm_){
			fsm_.update(Time.deltaTime);
		}
		 
	}

	
	
};