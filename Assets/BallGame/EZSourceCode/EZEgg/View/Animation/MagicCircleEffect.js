#pragma strict

class MagicCircleEffect extends MonoBehaviour{
	public var _sound:EZSound = null;
	public var _boxs:Collider[];
	public var _weights:UIWidget[];
	public var _big:GameObject = null;
	public var _speed:float = 36f;
	public var _upTime:float = 2.5f;
	public var _downTime:float = 2.5f;
	public var _shakePos:Vector3 = Vector3.one;
	public var _shakeTime:float = 0.1f;
	public var _middle:GameObject = null;
	public var _mScaleSpeed:float = -2.5f;
	public var _small:GameObject = null;
	public var _sScaleSpeed:float = 3.75f;
	public var _balls:GameObject[] = null;
	public var _ballParent:GameObject = null;
	public var _bScaleSpeed:float = 3.75f;
	public var _lights:UISprite[] = null;
	//public var _go:EZSound = null;
	private var isShow_:boolean = false;
	private var speed_:float = 0f;
	private var oldPos_:Vector3;
	
	public function Awake(){
		oldPos_ = this.transform.localPosition;
	}
	
	public function Start(){
		
	}
	
	public function Update(){
		round();
	}
	
	public function round(){
		if(isShow_&&(speed_ != 0)){
			//_big.transform.Rotate(Vector3.back*Time.deltaTime*speed_);
			_middle.transform.Rotate(Vector3.back*Time.deltaTime*speed_*_mScaleSpeed);
			_small.transform.Rotate(Vector3.back*Time.deltaTime*speed_*_sScaleSpeed);
			for(var i:int = 0;i<_balls.length;++i){
				_balls[i].transform.rotation = Quaternion.identity;
			}
			_ballParent.transform.Rotate(Vector3.back*Time.deltaTime*speed_*_bScaleSpeed);
		}
	}
	
	public function show(isShow:boolean){
		isShow_ = isShow;
		refresh();
	}	
	
	public function refresh(){
		for(var i:int = 0;i<_boxs.length;++i){
			_boxs[i].enabled = isShow_;
		}
		for(var j:int = 0;j<_weights.length;++j){
			_weights[j].enabled = isShow_;
		}
		

	}
	
	public function speedUp():Task{
		var task:Task = new Task();
		var tvSpeed:GeekTweenValue = null;
		var tvLight:GeekTweenValue = null;
		task.init = function(){
			_sound.play();
			_upTime = ((_speed - speed_)/_speed)*_upTime;
			if(_upTime < 0){
				_upTime = Mathf.Abs(_upTime);
			}
			tvSpeed = GeekTweenValue.Begin(this.gameObject,_upTime, speed_, _speed, this.gameObject, "setSpeed");
			tvLight = GeekTweenValue.Begin(_big,_upTime, _lights[0].color.a, 1f, this.gameObject, "setLight");
		};
		task.isOver = function():boolean{
			if(tvSpeed && tvSpeed.enabled && tvLight && tvLight.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	public function speedDown():Task{
		var task:Task = new Task();
		var tvSpeed:GeekTweenValue = null;
		var tvLight:GeekTweenValue = null;
		task.init = function(){
			_sound.stop();
			if(_speed != 0 && speed_ !=0){
				_upTime = (speed_ /_speed)*_downTime;
				if(_upTime < 0){
					_upTime = Mathf.Abs(_upTime);
				}
				tvSpeed = GeekTweenValue.Begin(this.gameObject,_downTime, speed_, 0, this.gameObject, "setSpeed");
				tvLight = GeekTweenValue.Begin(_big,_downTime, _lights[0].color.a, 0f, this.gameObject, "setLight");
			}
		};
		task.isOver = function():boolean{
			if(tvSpeed && tvSpeed.enabled && tvLight && tvLight.enabled){
				return false;
			}
			return true;
		};
		return task;
	}

	public function shake():Task{
		var tl:TaskList = new TaskList();
		var task1:Task = new Task();
		var tp1:GeekTweenPosition = null;
		task1.init = function(){
			//_go.play();
			tp1 = GeekTweenPosition.Begin(this.gameObject,_shakeTime,_shakePos);
			tp1.method = GeekTweener.Method.spring;
		};
		task1.isOver = function(){
			if(tp1 && tp1.enabled){
				return false;
			}
			return true;
		};
		tl.push(task1);
		
		var task2:Task = new Task();
		var tp2:GeekTweenPosition = null;
		task2.init = function(){
			tp2 = GeekTweenPosition.Begin(this.gameObject,_shakeTime,oldPos_);
			tp2.method = GeekTweener.Method.spring;
		};
		task2.isOver = function(){
			if(tp2 && tp2.enabled){
				return false;
			}
			return true;
		};
		tl.push(task2);
		
		return tl;
	}
	
	private function setSpeed(speed:float){
		speed_ = speed;
	}
	
	private function setLight(a:float){
		for(var i:int = 0;i<_lights.length;++i){
			_lights[i].color.a = a;
		}
	}
	
}