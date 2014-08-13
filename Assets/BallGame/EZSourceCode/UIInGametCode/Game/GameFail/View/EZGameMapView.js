#pragma strict
class EZGameMapView extends EZScreen{

	public var _runMethod:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _mapLength:Vector3 = Vector3(200.0f, 0.0f ,0.0f);
	public var _mapTime:float = 3.0f;
	private var begin_:Vector3 = Vector3.zero;
	public var _end:Vector3 = Vector3.zero;
	//public var _iPhone5BeginOffset = Vector3.zero;
	public var _iPhone5EndOffset = Vector3.zero;
	public var _time:float = 0.35f;
	public function Awake(){
		
		super.Awake();
		start_ = _player.gameObject.transform.localPosition;
		over_ = _foe.gameObject.transform.localPosition;
	}
	public function Start(){
		
		begin_ = this.gameObject.transform.localPosition;
		if(this.iPhone5){
			this._end += _iPhone5EndOffset;
		}
		hide();
	}

	public function showMapTask():Task{
		var task:Task = new Task();
		
		var isOver:boolean = false;
		
		task.init = function(){
			isOver = false;
		 	this.next();
		 	if(this.hasNext()){ 
		 		if(!this.isSame()){
		 			if(EZBGMManager.Instance()){
			 			if(this.hasBoss()){
			 				EZBGMManager.Instance().stopBGM();
			 				EZBGMManager.Instance().playBGM(EZBGMManager.AudioType.boss);
						}else{
							EZBGMManager.Instance().playBGM(EZBGMManager.AudioType.battle);
						}
					}
		 		}
		 		this.show();
		 		var show:Task = showTask(this._end);
				TaskManager.PushBack(show, function(){
					isOver = true;
				}); 
				TaskManager.Run(show);
			}else{
				isOver = true;
			}
		 	
		};
		task.isOver = function():boolean{
			return isOver;
		};
		
		return task;
	}
	private function hideTask():Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(this.gameObject, _time, begin_);
			tp.method = _method;
		};
		task.isOver = function(){
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}	
	public function runMapTask(time:float):Task{  
	
		var task:Task = new Task();
		
		var isOver:boolean = false;
		
		task.init = function(){
			isOver = false;
		 	if(this.hasNext()){ 
		 		this.show();
		 		var walk:Task =  this.walkTask(time);
				TaskManager.PushBack(walk, function(){
					isOver = true;
				}); 
				TaskManager.Run(walk);
			}else{
				if(this.hasBeforeBoss() && EZBGMManager.Instance()){
					EZBGMManager.Instance().playBGM(EZBGMManager.AudioType.battle);//the last foe over play battle
				}
				isOver = true;
			}
		 	
		};
		task.isOver = function():boolean{
			return isOver;
		};
		
		return task;
		
	}
	public function hideMapTask():Task{
		 	var task:Task = new Task();
		
		var isOver:boolean = false;
		
		task.init = function(){
			isOver = false;
		 	if(this.hasNext()){ 
		 		this.show();
		 		var hide:Task =  hideTask();
				TaskManager.PushBack(hide, function(){ 
				
				 this.hide();
					isOver = true;
				}); 
				TaskManager.Run(hide);
			}else{
				isOver = true;
			}
		 	
		};
		task.isOver = function():boolean{
			return isOver;
		};
		
		return task;
		
	}/**/
	
	
	enum PointType{
		Foe,
		Boss,
		None,
	};
	public var _boss:UISprite;
	public var _foe:UISprite;
	public var _line:UISprite;
	public var _player:UISprite; 
	
	private var start_:Vector3 = Vector3.zero;
	private var over_:Vector3 =Vector3.zero;
	private var path_:List.<PointType> = new List.<PointType>();
	private var points_:List.<UISprite> = new List.<UISprite>(); 
	private var show_:boolean = false;
	private var n_:float = 0;
	public function next(){
		n_++;  
		
	} 
	
	public function hasNext():boolean{
		if(n_<= points_.Count){
			return true;
		} 
		return false;
	}
	
	public function hasBoss():boolean{
		if(getPath(n_ - 1) == PointType.Boss){
			return true;
		}
		return false;
	}
	
	private function hasBeforeBoss():boolean{
		if(getPath(n_ - 2) == PointType.Boss){
			return true;
		}
		return false;
	}
	private function getPath(n:int):PointType{
		if(n<0  || n >= path_.Count){
		
			return PointType.None;
		}
		return path_[n];
	}
	public function isSame():boolean{
		if(n_ == 1){
			if(getPath(0) == PointType.Boss){
				return false;
			}else{
				return true;
			}
		}else if(getPath(n_ - 1) == getPath(n_- 2)){
			return true;
		}
		return false;
	}

	public function hide(){  
		show_ = false;
		_line.enabled = false;
		_player.enabled = false; 
		for(var i:int = 0; i<points_.Count; ++i){
			 points_[i].enabled = false;
		}
		
	} 
	
	
	public function show(){  
		show_ = true;
		_line.enabled = true;
		_player.enabled = true; 
		for(var i:int = 0; i<points_.Count; ++i){
			 points_[i].enabled = true;
		}
	}
	public function setup(map:JsonData.LevelData){
		Debug.Log(map.strongholds.Length);
		for(var i:int = 0; i<map.strongholds.Length; ++i){
			if(map.strongholds[i].box == true){
				continue;
			}
			if(map.strongholds[i].boss == true){
					path_.Add(PointType.Boss);
			}else{
					path_.Add(PointType.Foe);
			}
		}
		
		
		for(var j:int = 0; j< path_.Count; ++j){
			var r:float = (j+1.0f)/(path_.Count);
			var pt:Vector3 = start_ * (1-r) + over_ * r; 
			var obj:GameObject = null;
			if(getPath(j) == PointType.Foe){
				 obj = GameObject.Instantiate(_foe.gameObject);
			}else{
				 obj = GameObject.Instantiate(_boss.gameObject);
			} 
			
			obj.transform.parent = _foe.gameObject.transform.parent;
			obj.transform.localPosition = pt;
			obj.transform.localScale = _foe.gameObject.transform.localScale; 
			var sprite:UISprite = obj.GetComponent.<UISprite>(); 
			sprite.enabled = show_;
			points_.Add(sprite);
			obj.SetActive(true);
		}
	} 
	
	private function showTask(end:Vector3):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(this.gameObject, _time, end);
			tp.method = _method;
		};
		task.isOver = function(){
			if(tp && tp.enabled){
				return false;
			}
			
			return true;
		};
		return task;
	}
	
	

	public function walkTask(time:float):Task{
		var task:Task = new Task();
		
		var tp:GeekTweenPosition = null;
		task.init = function(){  
			var r:float = (n_)/(path_.Count);
			var pt:Vector3 = start_ * (1-r) + over_ * r; 
			tp = GeekTweenPosition.Begin(_player.gameObject, time, pt);
			tp.method = _runMethod;
		};
		task.isOver = function(){
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
}