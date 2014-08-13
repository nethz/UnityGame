#pragma strict
import System.Collections.Generic;

class EZBall extends MonoBehaviour{
	public var _random:EZRandom = null;
	public var position_: Vector2 = Vector2(0, 0);
	public var movePosition_:Vector2 = Vector2.zero;
	public var _view:EZBallView = null;
	private var group_:int = -1;
	private var type_:Geek.MagicType = Geek.MagicType.None;
	private var locked_:boolean = false;
	private var remove_:boolean = false;
	private var animationTime_:float = 0;
	private var speed_:float = 0; 
	private var moveList_:Array =  new Array();
	private var endPosition_: Vector2 = Vector2(0, 0);
	private var onMove_:boolean = false;
	private var beginPosition_: Vector2 = Vector2(0, 0);
	private var offset_:Vector2 = Vector2(0,0);
	private var temp_:EZBallTemp = null;
	private var id_:int = 0;
	private var mark_:boolean = false;
	private var isMark_:boolean = false;
	public var _clone:EZBallClone = null;
	public var _moveTime:float = 0.1f;
	
	
	
	
	public var _method:GeekTweener.Method = GeekTweener.Method.linear;
	public var _moveMethod:GeekTweener.Method = GeekTweener.Method.linear;
	
	
	function overTask():Task{
		return _view.overTask();
	}
	function setMark(mark:boolean){
		this.mark_ = mark;
		if(isMark_ && !this.mark_){
			isMark_ = false;
			if(locked_)
			{
				this._clone.setFlash(false);
			}else{
				
				this._view.setFlash(false);
				
			}
		}
	}
	function init(id:int, width:int, height:int){
		this.id_ = id;
		this.setViewPosition(this.position_, width, height); 
	}
	
	function nextState(magicTypes:List.<Geek.MagicType>):Task{
		for(var i:int = 0; i<magicTypes.Count; ++i){
			 if(magicTypes[i] == type_){
				return this._view.nextState();
			 }
		}
		return null;
	}
	function get3DPostion(){
		return this.gameObject.transform.position;
	}
	function setViewPosition(position:Vector2, width:float, height:float){ 
		this._view.setPosition(getCoordinate(position)); 
		
		if(position.x<0 || position.x > width -0.99f 
		|| position.y<0 || position.y > height -0.99f
		 ){ 
			if(this.temp_ == null){
				this.temp_ = new EZBallTemp(this.gameObject.transform.parent, this.gameObject);
				this.temp_.setVisible(true);
			}
			
			this.temp_.setType(this.getType());
			var pos = position;
			if(pos.x < 0){
				pos.x += width;
			}else if(pos.x > width -1){
				pos.x -= width;
			}
			
			if(pos.y < 0){ 
				pos.y += height;
			}else if(pos.y > height -1){
				pos.y -= height;
			}
			this.temp_.setPosition_(pos);
		}else{
			if(this.temp_ != null){
				this.temp_.release();
				this.temp_ = null;
			}
		
		}
	}  
	
	function getCoordinate(position:Vector2):Vector2 {
		var ret:Vector2 = new Vector2(position.x*98.5 + 50, position.y*(98.5) + 50);
		return ret;
	
	}
	function setRemove(re:boolean){
		this.remove_ = re;
	
	}
	function setAlpha(a:float){
		this._view.setAlpha(a);
	}
	function getRemove(){
		return this.remove_;
	}
	function setGroup(group:int){
		this.group_ = group;
	}
	function getPosition(){
		return this.position_;
	}
	function getGroup(){
		return this.group_;
	}
	
	function locking(){
		this.locked_ = true; 
		_view.setFlash(false);
		
	}
	function clone(parent:Transform){
		this._clone.locked(parent, this.gameObject);
		this.setAlpha(0.5);
		return this._clone;
	}
	
	
	function unlock(){
		this.setAlpha(1);
		if(this._clone){
			this._clone.unlock();
		}
		this.locked_ = false;
	}
	function getType(){
		return this.type_;
	}
	function _setPosition(position:Vector2, width:int, height:int){
		
		this.position_ = position;
		this.setViewPosition(this.position_, width, height); 
		this.beginPosition_ = this.position_;
		
		this.moveList_.clear();
		
	} 
	function getText(){
		return "g:"+ this.getGroup();
	}
	function setType(t:Geek.MagicType){
	
		this.type_ = t;
		this._view.magicType = t;
	}
	function random(ballState:EZBallViewData.State[]){
	
		var random:int = 0;
		if(_random != null){
			
			random = _random.range(0, 6);
		
		}else{
			random = Random.Range(0, 6);
		
		}
		switch(random){
		case 0:
			this.setType(Geek.MagicType.Fire);
			break;
		case 1:
			this.setType(Geek.MagicType.Wood);
			break;
		case 2:
			this.setType(Geek.MagicType.Crystal);
			break;
		case 3:
			this.setType(Geek.MagicType.Metal);
			break;
		case 4:
			this.setType(Geek.MagicType.Earth);
			break;
		case 5:
			this.setType(Geek.MagicType.Water);
			break;
		}
		
		this._view.setState(ballState[this.type_]);
	}



	private function moveToPosition(position:Vector2){
		this.position_ = position;
		this.movePosition_ = position;
		this.name = "Ball"+position.y + position.x;
		this.moveList_.push(position);
		
	} 
	function getOffsetPosition(offset:Vector2, width:int, height:int){
		var x  = this.position_.x + offset.x;
		if(x >= width) 
			x  -= width;
		if(x <0)
			x += width;
		var y  = this.position_.y + offset.y;
		
		if(y >= height) 
			y  -= height;
		if(y <0)
			y += height;
		return Vector2(x, y);
	}
	 
	function setOffset(offset:Vector2, width:int, height:int){
		this.moveToPosition(this.getOffsetPosition(offset, width, height));
	}
	function isMoving():boolean{
		return this.moveList_.length != 0;
	
	}
	///function value2Move(val:boolean)
	//function moveTask():Task{
	//	var task:Task = new Task();
		
	//	return task;
	
//	}
	function update(d:float, width:int, height:int){
		
		var self = this;
		if(this.onMove_ == false && this.moveList_.length != 0){
			
			this.speed_ = this.moveList_.length;
			
			this.onMove_ = true;
			this.endPosition_ = this.moveList_.shift(); 
			if(this.endPosition_.x == 0 && this.beginPosition_.x == width -1){
				this.endPosition_ = Vector2(width , this.endPosition_.y);
			}
			if(this.endPosition_.x == width -1 && this.beginPosition_.x == 0){
				this.endPosition_ = Vector2(-1, this.endPosition_.y);
			}
				
			if(this.endPosition_.y == 0 && this.beginPosition_.y == height -1){
				this.endPosition_ = Vector2(this.endPosition_.x, height);
			}
			
			if(this.endPosition_.y == height -1 && this.beginPosition_.y == 0){
				this.endPosition_ = Vector2(this.endPosition_.x, -1);
			}
		}  
		
		
		if(this.onMove_ == true){
			
			this.animationTime_ += d * this.speed_;
			if(this.animationTime_ <= _moveTime){
			 	var r:float = GeekTweener.easeIt(_method, 0, 1, this.animationTime_/_moveTime);
			 	var point:Vector3 = this.beginPosition_*(1.0f - r) + this.endPosition_*r;
				this.setViewPosition(Vector2(point.x, point.y), width, height); 
			}else
			{
				if(this.endPosition_.x == width){
					this.endPosition_ = Vector2(0, this.endPosition_.y);
				}else if(this.endPosition_.x == -1){
					this.endPosition_ = Vector2(width -1, this.endPosition_.y);
				}
				
				if(this.endPosition_.y == height){
					this.endPosition_ = Vector2(this.endPosition_.x, 0);
				}else if(this.endPosition_.y == -1){
					this.endPosition_ = Vector2(this.endPosition_.x, height -1);
				}
					
				this.beginPosition_ = this.endPosition_;
				this.setViewPosition(endPosition_, width, height);  
				this.animationTime_ = 0;
				this.endPosition_ = Vector2(0, 0);//!!!
				this.onMove_ = false;
			}
			
		}else{
			if(this.mark_ && !isMark_)
			{	
				
				isMark_ = true;
				if(locked_){
					self._clone.setFlash(true);
				}else{
					self._view.setFlash(true);
				}
			}
		}
	
		
	}
	public function set depth(value:int){
	
	}
	
	function isLocking(){
		return this.locked_; 
	}
	/*function testTask(){
		var my:float = 4;
		var task:Task = new Task();
		task.update = function(d:float){
			
			Debug.Log(my);
			my =d;
		};
		return task;
	
	}
	*/

	function removeTask():Task{
		var task:Task =  this._view.removeTask();
		if(task){
			TaskManager.PushFront(task, function(){
				setMark(false);
			});
			
			
			TaskManager.PushBack(task, function(){
				setRemove(true);
			});
			return task;
		
		}
		return new Task();
		
	}
	
	
	function moveTask(begin:Vector2, end:Vector2, width:int, height:int):Task{
		
		var setup:GameSetup = GameSetup.getInstance();
		var self = this;
		var task:Task = new Task();
		var allTime:float = setup.fallTime;
		var time:float  = 0;
		task.init = function(){
			self._setPosition(end, width, height); 
			self._view.setPosition(getCoordinate(begin));
		};
		
		
		task.isOver = function(){
			return time >= allTime ;
			
		};
		
		task.update = function(d:float){
		
			if(!task.isOver()){
				time += d;
				
			 	var r:float = GeekTweener.easeIt(_moveMethod, 0, 1.0f, time/allTime);
				var x:float = begin.x * (1.0f-r) + end.x * (r);
				var y:float = begin.y * (1.0f-r) + end.y * (r);
				self._view.setPosition(getCoordinate(Vector2(x, y))); 
			}
		};
		
		
		task.shutdown = function(){
			self.setViewPosition(end, width, height); 

		};
		return task;
	}
	function newFallTask(begin:Vector2, end:Vector2, width:int, height:int, ballState:EZBallViewData.State[]):Task{
	
		var task:Task = new Task();
		var mtask:Task = this.moveTask(begin, end, width, height);
		task.init = function(){
			this.setAlpha(1);
			this.random(ballState);
			mtask.init();
		};
		task.update = function(d:float){
			mtask.update(d);
		};
		task.shutdown = function(){
			this.setRemove(false);	
			mtask.shutdown();
		};
		
		task.isOver = function(){
			return mtask.isOver();
		};
		
		return task;
	}

};
