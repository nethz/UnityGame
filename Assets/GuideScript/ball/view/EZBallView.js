#pragma strict

class EZBallView extends MonoBehaviour{
	
	
	public var _perfect:EZBallViewPerfect = null;
	public var _splintering:EZBallViewSplintering = null;
	public var _diamond:EZBallViewDiamond = null;
	//public var _flaw:EZBallViewFlaw = null;
	
	
	public var _splint:EZSound = null;
	
	
	
	
	public var _data:EZBallViewData = null;
	private var time_:float = 0;
	private var position_:Vector2 = Vector2.zero;
	public function setState(state:EZBallViewData.State){ 
		_data.state = state;
		refresh();
	}
	public function getState():EZBallViewData.State{ 
		return _data.state;
	}
	public function set magicType(value:Geek.MagicType){
		_data.magicType = value; 
		refresh();
	} 
	
	public function setAlpha(alpha:float){
		 _data.alpha = alpha;
		refresh();
	}
	public function get magicType():Geek.MagicType{
		return _data.magicType;
	}
	public function Awake(){
		_data._patchBig.enabled = false;
		_data._patchSmall.enabled = false;
		_data.magicType = UnityEngine.Random.Range(0, 5);
		this.refresh();
	}
	public function setPosition(position:Vector2){
		position_ =  position;
		refresh();
	}
	public function setLayer(layer:int){
		_data.layer = layer;
		refresh();
	}  
	
	  
	  
	
	
	
	
	

	
	public function overTask():Task{
		var task:Task = new Task();    
		var tr:GeekTweenRotation = null;
		var tl:TaskList = new TaskList();
		task.init = function(){
			_data._rockBroken.alpha = 1;
			_data._rockBroken.enabled = true;
			_data._rockBroken.spriteName = _data._names[_data.magicType].rockBroken;  
			tr = GeekTweenRotation.Begin(this.gameObject, _data._atime, Quaternion.AngleAxis(UnityEngine.Random.Range(-7, 7), Vector3.forward)); 
			tr.method = GeekTweener.Method.easeInOutElastic;  
		};
		task.isOver = function():boolean{
			if(tr && tr.enabled){
				return false;
			} 
			return true;
		};
		task.shutdown = function(){
			_data.alpha = 0; 
			
			refresh();  
			var count = Random.Range(4, 6);
			for(var i =0; i<count; ++i){
				TaskManager.Run(_data.spallTask(this.gameObject, _data.magicType, this.gameObject.transform.position, 130));
			}
		};
		tl.push(task);
		return tl;
	}

	private function getInterface():EZBallViewInterface{
		var face:EZBallViewInterface = null;
		switch(_data.state){
		case EZBallViewData.State.Perfect:
			 face = _perfect;
			 break;
		//case EZBallViewData.State.Flaw:
		//	 face = _flaw;
		//	 break;
		case EZBallViewData.State.Splintering:
			 face = _splintering;
			 break;
		case EZBallViewData.State.Diamond:
			 face = _diamond;
			 break;
		
		}
		return face;
	}
		
		
		
	public function nextState():Task{ 
		var face:EZBallViewInterface = getInterface();
		
	 	if(face != null){
	 	
	 	
			var task:Task = face.nextTask(_data);
			
			TaskManager.PushFront(task, function(){
				_splint.play();
			});
			TaskManager.PushBack(task, this.refresh);
			return task;
		}
		return null;
	
	}
	public function removeTask():Task{ 
	
		var face:EZBallViewInterface = getInterface();
		
		if(face != null){
			var mt:MultiTask = new MultiTask();
			var task:Task = face.removeTask(_data);
			
			TaskManager.PushFront(task, function(){
				_splint.play();
			});
			
			TaskManager.PushBack(task, this.refresh);
			mt.push(task);
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(0.4);
			mt.push(wait);
			return mt;
		}
		return null;
	}
	
	

	public function setFlash(flash:boolean){
		_data.flash = flash;
		if(_data.flash){
			time_ = 0;
		}
		refresh();
	}  

	
	
	public function Update(){
		if(this._data.flash){	
			this.time_ += Time.deltaTime; 
			var face:EZBallViewInterface = getInterface();
			
			if(face != null){
				face.update(_data, this.time_);
			}
			
			
		
		}
	}
	public function refresh(){ 
		this.gameObject.transform.localPosition = Vector3(position_.x, position_.y, 0);
		this._data.refresh();
	 	var face:EZBallViewInterface = getInterface();
		if(face != null){
			face.refresh(_data);
		}
	} 
	function getPosition():Vector3{
		return 	this.gameObject.transform.position;
	
	}
	

};
