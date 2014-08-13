#pragma strict

class EZCrystalInGame extends MonoBehaviour{
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	static private var instance_:EZCrystalInGame = null;
	public var _camera:Camera = null;
	public var _back:UISprite = null;
	public var _over:UISprite = null;
	public var _base:UISprite = null;
	public var _cry:UISprite = null;
	public var _side:EZCrystalSideManager = null;
	public var _text:UILabel = null;
	public var _molecular:float = 0;
	public var _denominator:float = 1; 
	public var _time:float = 0.35f;
	public var _hidePosition:Vector3 = Vector3.zero;
	private var showPosition_:Vector3 = Vector3.zero;
	private var hideOffset:Vector3 = Vector3.zero;
	public var iphone5Offset:EZiPhone5Offset = null;
	
	
	public var _button:EZCrystalWebButton = null;
	//public var _button:BoxCollider = null;
	public var _panel:UIPanel = null;
	public var _magic:String[];
	public var _group:String[];
	public var _bases:String[];
	public var _magicBallG:String;
	public var _pop:EZPopPosition = null;
	//public var _move:EZCrystalInGameMove = null;
	
	private var canAction_:boolean = false;
	private var isOpen_:boolean = false;
	private var annihilate_:boolean = false;
	
	class Text{
		public var _group:String[] = null;
		public var _groupBegin:String = "";
		public var _groupMid:String = "";
		public var _groupEnd:String = "";
		
		
		public var _levelBegin:String = "";
		public var _levelMid:String = "";
		public var _levelEnd:String = "";
		
		
		public function getGroup(from:int, to:int):String{
			Debug.Log(from);
			Debug.Log(to);
			var text:String = _groupBegin + _group[from] + _groupMid + _group[to] + _groupEnd;
			return text;
		}
		public function getLevel(from:int, to:int){
			var text:String = _levelBegin + from.ToString() + _levelMid + to.ToString() + _levelEnd;
			return text;
		}
		
		
		public var _normal:String = "";
		public function getNormal(){
			return _normal;
		}
		public var _energy:String = "";
		public function getEnergy(){
			return _energy;
		}
		
	};
	
	public var _popMessage:Text = null;
	public static function GetInstance():EZCrystalInGame{
		return instance_;
	}
	public function showTask(){
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(this.gameObject, _time, showPosition_);
			tp.method = _method;
		};
		task.isOver = function(){
			
			if(this.gameObject.active && tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function hideTask(){
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(this.gameObject, _time, (_hidePosition + hideOffset));
			tp.method = _method;
		};
		task.isOver = function(){

			if(this.gameObject.active && tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	
	} 
	public function setMagic(magic:int, group:int){
		if(magic >=0 && magic < _magic.Length){
			_cry.spriteName = _magic[magic];
		}else{
			Debug.LogError("magic:"+ magic);
		
		}
		
		if(group >=0 && group < _group.Length){
			_back.spriteName = _group[group];
		}else{
			Debug.LogError("group:"+ group);
		
		}
		
		
	}
	public function setup(mp:int, maxMp:int, magic:int, group:int, lv:int){
		this.setNumber(mp, maxMp);
		this.setMagic(magic, group);
		if(lv >= 0 && lv < _bases.Length ){
			_base.spriteName = _bases[lv];
		}
		_base.MakePixelPerfect();
	}
	
	
	public function canAction(enabled:boolean, battle:EZSoul, crystal:EZModelCrystal){
		Debug.LogWarning("enabled" );
		if(battle && crystal){
				Debug.LogWarning("1enabled" );
			if(battle.group != crystal.group){
				Debug.LogWarning("2enabled" );
				canAction_  = false;
				_pop.tipMessage = _popMessage.getGroup(crystal.group, battle.group);
			}else if(!enabled){
				
				Debug.LogWarning("3enabled" );
				_pop.tipMessage = _popMessage.getNormal();
				canAction_  = false;
				
			}else{
				Debug.LogWarning("+" + _molecular + _denominator+_popMessage.getNormal());
				if(_molecular >= _denominator){
					_pop.tipMessage = _popMessage.getNormal();
				}else{
					_pop.tipMessage = _popMessage.getEnergy();
				}
				canAction_  = true;
			}
		}else{
			_pop.tipMessage = _popMessage.getNormal();
			canAction_  = false;
		}
	
		
		
		
		this.refresh();
	}
	
	public function Awake(){
		instance_ = this; 
		canAction_ = false;
		close();
		
	}
	public function Start(){
		showPosition_ = this.gameObject.transform.localPosition;
		hideOffset = iphone5Offset.offset;
	}
	public function close(){
		isOpen_ = false;
		this.refresh();
	}
	public function open(){
		isOpen_ = true;
		this.refresh();
	}
	/*
	public function moveLeft(){
		_move.moveLeft();
	}
	
	public function moveRight(){
		_move.moveRight();
	}*/
	
	public function web(){
		_side.web();
	
	}
	public function reset(molecular:int, denominator:int){
		_side.reset();
		this.setNumber(molecular, denominator);
		
	}
	public function getScreenPosition():Vector3{
		return _camera.WorldToScreenPoint(this.transform.position);
	}
	public function setPowerTask(power:int):Task{
		var mt:MultiTask = new MultiTask();
		Debug.Log(power);
		mt.push(numberTask(power, 0.2));
		mt.push(_side.flyTask(0.2));
		/*TaskManager.PushBack(mt, function(){
			//if(_molecular>= _denominator){
			//	this._side.filled();
			//}
		});*/
		return mt;
	}
	public function fillTask(time:float):Task{
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject, time, 0.0f, 1.0f, this.gameObject, "fill");
		};
		
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		
		return task;	
	
	}
	public function setNumberItem(molecular:float){
		setNumber(Mathf.FloorToInt(molecular), _denominator);
		
	}
	public function setNumber(molecular:int, denominator:int){
	
		_molecular = molecular; 
		_denominator = denominator;
		if(_molecular > _denominator){
			_molecular = _denominator;
			
		}
		if(_molecular >= _denominator){
			this._side.filled();
		}
		refresh();
	}
	public function numberTask(molecular:int, time:float){
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject, time, _molecular, molecular, this.gameObject, "setNumberItem");
			
		};
		
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		
		return task;	
	}
	public function refresh(){
		
		if(annihilate_){
			return;
		}
		_text.text = _molecular.ToString() + "/" + _denominator.ToString();
		
		this.fill(_molecular/_denominator);
		if(this.canAction_){
			_panel.alpha = 1;
			if(isOpen_){
				_button.isActive = true;
			}else{
				_button.isActive = false;
			}
		}else{
			_button.isActive = false;
			_panel.alpha = 0.33;
		}
	}
	
	
	
	public function fill(degree:float){
		degree = Mathf.Clamp01(degree);
		//var d:float = 0.058 * (1-degree) + (1- 0.058) * degree;
		_back.fillAmount = degree;
		_over.fillAmount = 1.0f - degree;
	}
	
	
	
	public function set annihilate(value:boolean){
		annihilate_ = value;
		if(annihilate_){
			this.gameObject.SetActive(false);
		}
		
	}
}