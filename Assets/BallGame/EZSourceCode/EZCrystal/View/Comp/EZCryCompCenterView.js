#pragma strict

class EZCryCompCenterView extends MonoBehaviour{
	public var _base:UISprite;
	public var _box:BoxCollider;
	public var _button:UISprite;
	public var _expBar:UISprite;
	public var _label:UILabel;
	public var _lv:UILabel;
	public var _shade:UISprite;
	private var max_:float = 12;
	private var exp_:float = 3;
	private var lv_:float = 3;
	private var scale_:Vector3;
	private var lvScale_:Vector3;
	
	public var _baseLv:String[];
	public var _ballType:String[];
	
	public function get exp():float{
		return exp_;
	}
	
	public function set exp(value:float){
		this.exp_ = value;
	}
	
	public function get max():float{
		return max_;
	}
	public function set max(value:float){
		this.max_ = value;
	}
	public function get lv():float{
		return lv_;
	}
	public function set lv(value:float){
		this.lv_ = value;
	}
	public function setExpTask(exp:float):Task{
		exp_ = exp;
		return refreshTask(0.2);
	}
	public function setGroup(group:int){
		if(group >= 0 && group < _ballType.Length){
			_button.spriteName = _ballType[group];
			_shade.spriteName = _ballType[group];
		
		}
	
	}
	public function setLvTask(lv:float, time:float):Task{
		lv_ = lv;
		
		var tl:TaskList = new TaskList();
		tl.push(openLvTask(time));
		tl.push(closeLvTask(time));
		TaskManager.PushFront(tl, function(){ 
			
			_lv.text = "Lv" + (lv_+1).ToString();
			
			
		});
		TaskManager.PushBack(tl, function(){
			var bv:int = lv_;
			if(bv < 0){
				bv = 0;
			}else if(bv >= _baseLv.Length){
				bv =  _baseLv.Length - 1;
			}
			_base.spriteName = _baseLv[bv];
		});
		return tl;
		
	}
	
	public function openLvTask(time:float):Task{
	
		
		var task:Task = new Task();
		var ts:TweenScale = null;
		task.init = function(){
			ts = TweenScale.Begin(_lv.gameObject, time, lvScale_ * 1.5);
		};
		task.isOver = function():boolean{
			if(ts && ts.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	public function closeLvTask(time:float):Task{
	
		
		var task:Task = new Task();
		var ts:TweenScale = null;
		task.init = function(){
			ts = TweenScale.Begin(_lv.gameObject, time, lvScale_);
		};
		task.isOver = function():boolean{
			if(ts && ts.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function Awake(){
		scale_ = _shade.transform.localScale;
		lvScale_ = _lv.transform.localScale;
	}
	public function get shade():UISprite{
		return _shade;
	}
	
	public function setExpBar(bar:float){
		_expBar.fillAmount = bar;
	}

	public function refreshTask(time:float):Task{ 
		var data:JsonData.MagicBall = EZMagicBallTable.GetInstance().data;
		var setup:JsonData.BallSetup = data.setup; 
		var task:Task = new Task();  
		var target:float = 1.0f;
		if(max_ != 0){
			target = exp_/max_; 
		}
		var text:String = exp_.ToString() + "/" +max_.ToString(); 
		if(lv_ > setup.maxLv()){
			text = "Max";
		}
			
		var lvText = "Lv" + (lv_+1).ToString(); 
		Debug.Log("max lv" + setup.maxLv());
		Debug.Log("lv_" + (lv_+1));
		
				
		
		if(target > _expBar.fillAmount){
			var tv:GeekTweenValue = null;
			task.init = function(){
				tv = GeekTweenValue.Begin(_expBar.gameObject, time, _expBar.fillAmount, target, this.gameObject, "setExpBar");
				_label.text = text;
				_lv.text = lvText;
			};
			task.isOver = function():boolean{
				if(tv && tv.enabled){
					return false;
				}
				return true;
			};
			
		
		}else{
			task.init = function(){
				_expBar.fillAmount = target;	
				_label.text = text;
				_lv.text = lvText;
			};
		}
		
		TaskManager.PushBack(task, function(){
			var bv:int = lv_;
			if(bv < 0){
				bv = 0;
			}else if(bv >= _baseLv.Length){
				bv =  _baseLv.Length - 1;
			}
			_base.spriteName = _baseLv[bv];
		});
		return task;
	}
	
	
	
	
	public function open(){
		TaskManager.Run(refreshTask(0));
		_base.enabled = true;
		_box.enabled = true;
		_button.enabled = true;
		_expBar.enabled = true;
		_label.enabled = true;
		_lv.enabled = true;
		_shade.enabled = true;
	}
	public function close(){
	
		_base.enabled = false;
		_box.enabled = false;
		_button.enabled = false;
		_expBar.enabled = false;
		_label.enabled = false;
		_lv.enabled = false;
		_shade.enabled = false;
	}
	
	public function ballOpen(time):Task{
		var task:Task = new Task();
		var ts:TweenScale = null;
		task.init = function(){
			ts = TweenScale.Begin(_shade.gameObject, time, scale_ * 1.5);
		};
		task.isOver = function():boolean{
			if(ts && ts.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	public function ballClose(time):Task{
		var task:Task = new Task();
		var ts:TweenScale = null;
		task.init = function(){
			ts = TweenScale.Begin(_shade.gameObject, time, scale_);
		};
		task.shutdown = function(){
			
		};
		task.isOver = function():boolean{
			
			
			if(ts && ts.enabled){
				return false;
			}
			return true;
			
		};
		return task;
	}
	
	
}