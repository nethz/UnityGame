#pragma strict

var TranslateSpeed = 20;
var RotateSpeed = 1000;

class Ball{
	
	private var position_: Vector2 = Vector2(0, 0);
	private var obj_:BallBind;
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
	private var text_:String = "test";
	private var temp_:BallTemp = null;
	private var id_:int = 0;
	private var mark_:boolean = false;
	private var isMark_:boolean = false;
	private var clone_:BallClone = null;
	function setMark(mark:boolean){
		this.mark_ = mark;
		if(isMark_ && !this.mark_){
			isMark_ = false;
			if(locked_)
			{
				this.clone_.setFlash(false);
			}else{
				this.obj_.setFlash(false);
			}
		}
	}
	function Ball(obj:BallBind){
		this.obj_ = obj;
	}
	function init(id:int){
		this.id_ = id;
	
		this.setViewPosition(this.position_); 
		this.obj_.setSize(Geek.Screen2Space(AutoSize.getInstance().getBallSize(), PuzzleCamera.instance().orthographicSize));	
		this.obj_.setVisible(true);
	}
	function get3DPostion(){
		
		var offsetSP = Geek.Screen2Space(AutoSize.getInstance().getOffset(PuzzleCamera.instance()),PuzzleCamera.instance().orthographicSize);
		//var offset = Common.Space2Screen(setup.fingerOffset);
		var p:Vector3 = getCoordinate(this.position_);
		p.z = this.obj_.getPosition().z;
		var scale:Vector3 = Geek.GetWorldScale(this.obj_.transform.parent);
		p.x *= scale.x;
		p.y *= scale.y;
		
		p.y += this.obj_.transform.parent.localPosition.y;
		p.x += this.obj_.transform.parent.localPosition.x;
		return p;
	}
	function setViewPosition(position:Vector2)
	{
		var self = this;
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		if(position.x<0 || position.x > matrix.x -1 
		|| position.y<0 || position.y > matrix.y -1
		 ){ 
			if(this.temp_ == null){
				this.temp_ = new BallTemp(obj_.gameObject);
			//	this.temp_.constructed();
				this.temp_.setRotate(this.obj_.getRotate());
				this.temp_.setVisible(true);
			}
			
			this.temp_.setType(this.getType());
			var pos = position;
			if(pos.x < 0){
				pos.x += matrix.x;
			}else if(pos.x > matrix.x -1){
				pos.x -= matrix.x;
			}
			
			if(pos.y < 0){
				pos.y += matrix.y;
			}else if(pos.y > matrix.y -1){
				pos.y -= matrix.y;
			}
			this.temp_.setPosition(pos);
		}else{
			if(this.temp_ != null){
				this.temp_.release();
				this.temp_ = null;
			}
		
		}
		
		this.obj_.setViewPosition(getCoordinate(position)); 
	}
	function getCoordinate(position:Vector2):Vector2 {
		return Geek.Coordinate(position, this.obj_.transform.parent, PuzzleCamera.instance().orthographicSize);
	
	}
	function setRemove(re:boolean){
		this.remove_ = re;
	
	}
	function setAlpha(a:float){
		this.obj_.setAlpha(a);
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
		this.obj_.setLocked(this.locked_);
		this.obj_.setFlash(false);
	}
	function clone(){
		this.clone_ = new BallClone(obj_.gameObject);
		
		this.clone_.setType(this.getType()); 
		this.clone_.setRotate(this.obj_.getRotate());
		return this.clone_;
	}
	function unlock(){
		this.clone_ = null;
		this.locked_ = false;
		this.obj_.setLocked(this.locked_);
	}
	function getType(){
		return this.type_;
	}
	function setPosition(position:Vector2){
		this.position_ = position;
		this.setViewPosition(this.position_); 
		this.beginPosition_ = this.position_;
	} 
	function getText(){
		return "g:"+ this.getGroup();
	}
	function setType(t:Geek.MagicType){
	
		this.type_ = t;
		this.obj_.setType(t);
	}
	function random(){
		switch(Random.Range(0, Geek.MagicType.Length)){
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
		this.obj_.setRotate(GameSetup.getInstance().ballMaxRotate *2 *Random.value - GameSetup.getInstance().ballMaxRotate);
	}



	function moveToPosition(position:Vector2){
		this.position_ = position;
		this.text_ = "p" + position.x +":"+ position.y;
		
		this.moveList_.push(position);
		
	} 
	function getOffsetPosition(offset:Vector2){
		var self = this;
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var x  = this.position_.x + offset.x;
		if(x >= matrix.x) 
			x  -= matrix.x;
		if(x <0)
			x += matrix.x;
		var y  = this.position_.y + offset.y;
		
		if(y >= matrix.y) 
			y  -= matrix.y;
		if(y <0)
			y += matrix.y;
		return Vector2(x, y);
	}
	 
	function setOffset(offset:Vector2){
		this.moveToPosition(this.getOffsetPosition(offset));
	}
	
	function update(d:float){
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var self = this;
		if(this.onMove_ == false && this.moveList_.length != 0){
			
			this.speed_ = this.moveList_.length;
			if(this.position_.x ==3 && this.position_.y ==3){
				for(var n =0; n < this.moveList_.length; ++n){
					var temp:Vector2 = this.moveList_[n];
				}
			}
			this.onMove_ = true;
			this.endPosition_ = this.moveList_.shift(); 
		
			if(this.endPosition_.x == 0 && this.beginPosition_.x == matrix.x -1)
			{
				this.endPosition_ = Vector2(matrix.x , this.endPosition_.y);
			}
			if(this.endPosition_.x == matrix.x -1 && this.beginPosition_.x == 0){ 
			
				this.endPosition_ = Vector2(-1, this.endPosition_.y);
			}
				
			if(this.endPosition_.y == 0 && this.beginPosition_.y == matrix.y -1){
				this.endPosition_ = Vector2(this.endPosition_.x, matrix.y);
			}
			
			if(this.endPosition_.y == matrix.y -1 && this.beginPosition_.y == 0){
				this.endPosition_ = Vector2(this.endPosition_.x, -1);
			}
		}  
		
		
		if(this.onMove_ == true)
		{
			
			this.animationTime_ += d *this.speed_;
			if(this.animationTime_ <=0.1){ 
			 
				var x:float =this.beginPosition_.x * (0.1 - this.animationTime_)/0.1 + this.endPosition_.x * (this.animationTime_/0.1);
				var y:float = this.beginPosition_.y * (0.1 - this.animationTime_)/0.1 + this.endPosition_.y * (this.animationTime_/0.1);
				
				this.setViewPosition(Vector2(x, y)); 
			}else
			{
				if(this.endPosition_.x == matrix.x){
					this.endPosition_ = Vector2(0, this.endPosition_.y);
				}else if(this.endPosition_.x == -1){
					this.endPosition_ = Vector2(matrix.x -1, this.endPosition_.y);
				}
				
				if(this.endPosition_.y == matrix.y)
				{
					this.endPosition_ = Vector2(this.endPosition_.x, 0);
				}else if(this.endPosition_.y == -1){
					this.endPosition_ = Vector2(this.endPosition_.x, matrix.y -1);
				}
					
				this.beginPosition_ = this.endPosition_;
				
				this.setViewPosition(endPosition_);  
				this.animationTime_ = 0;
				this.endPosition_ = Vector2(0, 0);//!!!
				this.onMove_ = false;
			}
			
		}else{
			if(this.mark_ && !isMark_)
			{	
				
				isMark_ = true;
				if(locked_)
				{
					
					self.clone_.setFlash(true);
				}else{
					self.obj_.setFlash(true);
				}
			}
		}
	
		
	}
	
	
	function isLocking(){
		return this.locked_; 
	}
	function testTask(){
		var my:float = 4;
		var task:Task = new Task();
		task.update = function(d:float){
			
			my =d;
		};
		return task;
	
	}
	

	function removeTask(){
		var self = this;
		var task:Task = this.obj_.removeTask();
		var oInit = task.init;
		var oUpdate = task.update;
		var time:float = 0;
		var spall:boolean = false;
		task.init = function(){
			oInit();
			time = 0;
			spall = false;
			self.setMark(false);
			self.obj_.crack();
		};
		task.update = function(d:float){
			oUpdate(d);
			
			time += d;
			
			if(!spall && time >= GameSetup.getInstance().spallTime){
				spall = true;
				this.obj_.spall();
				var count = Random.Range(2, 5);
				for(var i =0; i<count; ++i){
					TaskManager.Run(self.obj_.spallTask(self.getType()));
				}
			}
			
		};
		var oShutdown = task.shutdown;
		task.shutdown = function(){
			oShutdown();
			self.setRemove(true);
		};
		return task;
	}
	
	
	function moveTask(begin:Vector2, end:Vector2){
	
		var setup:GameSetup = GameSetup.getInstance();
		var self = this;
		var task:Task = new Task();
		var allTime:float = setup.fallTime;
		var time:float  = 0;
		task.init = function(){
			self.setPosition(end); 
			self.obj_.setViewPosition(getCoordinate(begin)); // (begin); 
		};
		
		
		task.isOver = function(){
			return time >= allTime;
			
		};
		
		task.update = function(d:float){
		
			if(!task.isOver())
			{
				time += d;
				var x:float = begin.x * (allTime - time)/allTime + end.x * (time/allTime);
				var y:float = begin.y * (allTime - time)/allTime + end.y * (time/allTime);
				self.obj_.setViewPosition(getCoordinate(Vector2(x, y))); 
			}
		};
		
		
		task.shutdown = function(){
			self.setViewPosition(end); 
		};
		return task;
	}
	function newFallTask(begin:Vector2, end:Vector2){
		var self = this;
		var task:Task = new Task();
		var mtask:Task = this.moveTask(begin, end);
		task.init = function(){
			self.setAlpha(1);
			self.random();
			mtask.init();
		};
		task.update = function(d:float){
			mtask.update(d);
		};
		task.shutdown = function(){
			self.setRemove(false);	
			mtask.shutdown();
		};
		
		task.isOver = function(){
			return mtask.isOver();
		};
		
		return task;
	}

};
