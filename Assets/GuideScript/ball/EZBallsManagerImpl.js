#pragma strict

import System.Collections.Generic;
class EZBallsManagerImpl extends MonoBehaviour{
	public var _balls:EZBallsMultiArray = null;
	public var _close:EZLeadRpg = null;
	public var _moveList:EZMoveList = null;
	public var _no:EZSound = null;
	public var _groundManager:EZGroundManager = null;
	public var _fallAction:EZFallAction = null;
	private var time_:float = 0;
	private var change_:boolean = false;
	private var ballState_:EZBallViewData.State[] = new EZBallViewData.State[Geek.MagicType.Length];
	public var _ballState:EZBallViewData.State = EZBallViewData.State.Perfect;
	private var gameOver_:boolean = false;
	private var allOver_:boolean = false;
	public var _overTime:float = 1.0f;
	public function leadNext():boolean{
		return false;
	}
	public function get lead():EZLead{
		var lManager:EZLeadManager = EZLeadManager.GetInstance();
		if(lManager == null){
			return null;
		}
		return lManager._ctrl._lead;
	}
	private var ball_:EZBall = null; 
	public function leadFount(fount:boolean){
		if(ball_ != null){
			ball_._view.setLayer(0);
			ball_ = null;
		}
		if(lead && fount){
			var start:Vector2 = lead.start;
			var ball:EZBall = this._balls.getObj(start.x, start.y) as EZBall;
			ball._view.setLayer(30);
			ball_ = ball;
		}
	}
	public function leadShine(shine:boolean){
		
		if(lead){
			var start:Vector2 = lead.start;
			var ball:EZBall = this._balls.getObj(start.x, start.y) as EZBall;
			ball.setMark(shine);
			
		}
	
	}
	public function shot(){
		for(var i:int =0 ; i<6; ++i){
			for(var j:int = 0 ; j< 5; j++){
				var ball:EZBall = this._balls.getObj(i, j) as EZBall;
				var type:int = ball.getType();
				this.lead.back[i*5 + j] = type;
			}
		}
	
	}
	public function compare():boolean{
		var balls:Geek.MagicType[] = this.lead.balls;
		for(var i:int =0 ; i<6; ++i){
			for(var j:int = 0 ; j< 5; j++){
				var ball:EZBall = this._balls.getObj(i, j) as EZBall;
				
				var type:int = ball.getType();
				if(type != balls[i*5 + j]){
					return false;
				}
			}
		}
		return true;
	}
	public function punch(){
		for(var i:int =0 ; i<6; ++i){
			for(var j:int = 0 ; j< 5; j++){
				var ball:EZBall = this._balls.getObj(i, j) as EZBall;
				var type:int = this.lead.back[i*5 + j];
				ball.setType(type);
			}
		}
	}
	
	public function get ballState():EZBallViewData.State[]{
		return ballState_;
	}
	function Awake(){ 
		for(var i:int = 0; i< ballState_.Length; ++i){
			ballState_[i] = _ballState;
		}
		gameOver_ = false;
		allOver_ = false;
		TaskManager.registerTask("puzzle.group", this.groupTask);
		TaskManager.registerTask("puzzle.remove", this.removeTask);
		TaskManager.registerTask("puzzle.fall", this.fallTask);
	}
	
	function OnDestroy(){
		TaskManager.unregisterTask("puzzle.group");
		TaskManager.unregisterTask("puzzle.remove");
		TaskManager.unregisterTask("puzzle.fall");
	}
	
	
	function getGroundManager(){
		return this._groundManager;
	}
	function locking(position:Vector2){
		var self = this;
		var bl:EZBallLock = new EZBallLock();
		var xy:Vector2 = this.point2ball2cell(position);
		bl.setXY(xy);
		var ball:EZBall = this._balls.getObj(xy.x, xy.y) as EZBall;
		bl.setBall(ball);
		bl.setClone(ball.clone(this.gameObject.transform));
		bl.getBall().locking();
		this._moveList.begin(xy);
		return bl;
	}
	
	function unlock(lk:EZBallLock){
		lk.release();
	}
	function relocking(lk:EZBallLock, p:Vector2){
	
		var self = this;
		var pos:Vector2 = lk.getBall().getPosition();
		
		
		var xy:Vector2 = Vector2(pos.x+p.x, pos.y+p.y);
		if(xy.x < 0){
			xy.x =0;
		}else if(xy.x >= _balls.width){
			xy.x = _balls.width -1;
		}
		if(xy.y < 0){
			xy.y =0;
		}else if(xy.y >= _balls.height){
			xy.y = _balls.height -1;
		}
		
		this.unlock(lk);
		lk.setXY(xy);
		var ball:EZBall = this._balls.getObj(lk.getXY().x, lk.getXY().y) as EZBall;
		lk.setBall(ball);
		lk.setClone(ball.clone(this.gameObject.transform));
		lk.getBall().locking();
		this._moveList.begin(lk.getXY());
		return lk;
		
	}
	
	function clearChange(){
		this.change_ = false;
	}
	function isChange(){
		return this.change_;
	}
	function isMoving():boolean{
		for(var x=0; x <this._balls.width; x++)
		{
			for(var y = 0; y <_balls.height; y++)
			{	
				var ball:EZBall = this._balls.getObj(x, y) as EZBall;
				if(ball.isMoving()){
					return true;
				}
			}
		}
		return false;
	
	}
	function moving(lk:EZBallLock, p:Vector2):boolean{
		
		var xy:Vector2 = this.point2ball2cell(p);
		var pos:Vector2 = lk.getBall().getPosition();
		
		
		if(xy.x != pos.x || xy.y != pos.y)
		{
			this.change_ = true;
			if(xy.x != pos.x)
			{
				this._moveList.moveX(xy.x-pos.x);
				
			}else if(xy.y != pos.y){
				this._moveList.moveY(xy.y-pos.y);
			}
			
			var point:Vector2 = this._moveList.getPoint();
			
			for(var x=0; x <_balls.width; x++){
				for(var y = 0; y < _balls.height; y++)
				{
					var ball:EZBall = this._balls.getObj(x, y) as EZBall;
					
					if(ball != null)
					{
						var offset:Vector2 = this._moveList.getOffset(Vector2(x, y));
						ball.setOffset(offset, _balls.width, _balls.height);
					}
				}
			}
			
			var the_ball:EZBall = this._balls.getObj(point.x, point.y) as EZBall;
			var posi:Vector2 = the_ball.getPosition();
			this._moveList.release();
			this.rebuild();
			this._moveList.begin(posi);
			this.getGroundManager().grouping();
			this.getGroundManager().mark();
			return true;
		}else{
			return false;
		}
		
	}
	function rebuild(){
		
		var list:EZBall[] = new EZBall[this._balls.size];
		
		for(var x=0; x <this._balls.width; x++)
		{
			for(var y = 0; y <_balls.height; y++)
			{	
				var ball:EZBall = this._balls.getObj(x, y) as EZBall;
				list[y*this._balls.width+x] = ball;
			}
		}
		
		for(var i:int = 0; i< list.Length; ++i){
			var temp:EZBall = list[i];
			if(temp != null){
				var p:Vector2 = temp.getPosition();
				this._balls.setObj(p.x, p.y, temp);
			}
		
		}
	
	}
	
	function update(d:float, width:int, height:int){
		
		
		for(var x=0; x <_balls.width; x++)
		{
			for(var y = 0; y < _balls.height; y++)
			{ 
				var ball:EZBall = this._balls.getObj(x, y) as EZBall;
				if(ball != null)
					ball.update(d, width, height);
				
			}
		}
	
	}
	public function isGameOver():boolean{
		return gameOver_;
	}
	function gameOver(){
		gameOver_ = true;
	}
	public function isAllOver():boolean{
		return allOver_;
	}
	function allOver(){
		allOver_ = true;
	}
	function addBall(x:int, y:int, ball:EZBall){
		this._balls.setObj(x, y, ball);
	
	}
	function init(){
	
		var id = 0;
		for(var x=0; x <_balls.width; x++){
			for(var y = 0; y <_balls.height; y++){	
				var ball:EZBall = this._balls.getObj(x, y) as EZBall;
				ball._setPosition(Vector2(x, y), this._balls.width, this._balls.height);
			}
		}
		
		while(this._groundManager.grouping()){
			this._fallAction.upset(ballState_);
		}
		
	}

	function readly(){
		// n:int = this.balls.length; 
		return true;
	}
	function point2ball(p:Vector2){///!!! 
	
		var bs:Vector2 = AutoSize.getInstance().getBallSize();
		var x = ((p.x)/ (1.0f/_balls.width));
		var y = ((p.y)/ (1.0f/_balls.height));
		return Vector2(x, y);
	}
	function point2ball2cell(p:Vector2){
		var xy = this.point2ball(p);
		var x = Mathf.Floor(xy.x);
		var y = Mathf.Floor(xy.y);
		return Vector2(x, y);
	}
	function groupTask(){
		var task:EZGroupTask = new EZGroupTask();
		var success = false;
		task.init = function(){
			success = this._groundManager.grouping();
		};
		task.success = function(){
			return success;
		};
		return task;
	
	}
	function fallTask(){
		var task:Task = new Task();
		var fallTask:Task = null;
		
		task.init = function(){
			fallTask = this._fallAction.rebuild(ballState_);
			fallTask.init();
			this.rebuild();
		};
		task.update = function (d:float){
			fallTask.update(d);
		};
		
		
		task.shutdown = function (){
			fallTask.shutdown();
		};
		task.isOver = function(){
			return fallTask.isOver();
		
		};
		return task;
	
	}
	
	function nextState(magicTypes:List.<Geek.MagicType>):Task{
		var mt:MultiTask = new MultiTask();
		for(var x=0; x <_balls.width; x++){
			for(var y = 0; y <_balls.height; y++){	
				var ball:EZBall = this._balls.getObj(x, y) as EZBall;
				var task:Task = ball.nextState(magicTypes); 
				if(task){
					mt.push(task);
				}
			}
		}  
		TaskManager.PushFront(mt, function(){
			for(var i:int = 0; i< magicTypes.Count; ++i){
					if(ballState_[magicTypes[i]]<EZBallViewData.State.Diamond){
						ballState_[magicTypes[i]] = ballState_[magicTypes[i]]+1;
					}
			} 
			
		});
		return mt;
	
	}
	public function overTask():Task{
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(_overTime);
		tl.push(wait);
		for(var y = 0; y <_balls.height; y++){	
			for(var x =0; x <_balls.width; x++){
				
				var ball:EZBall = null;
				if(y %2 == 0){
					ball = this._balls.getObj(x, _balls.height - y -1) as EZBall;
				}else{
					ball = this._balls.getObj(_balls.width - x -1, _balls.height - y -1) as EZBall;
				}
				tl.push(ball.overTask());
			}
		}
		return tl;
	}
	function removeTask():Task{
	
		var task:EZRemoveTask = new EZRemoveTask();
		
		 
		var over = false;
		var allList:Array = null;
		var position = Vector3(0,0,0);
		var bType:Geek.MagicType = Geek.MagicType.None;
		var bp:EZBallPosition = new EZBallPosition(1);
		
		var _info:EZRemoveInfo=null;
		task.setInfoAccepted = function(info:EZRemoveInfo){
			_info = info;
		};
		
		var pickup = function(){
		
			var group:Boo.Lang.Hash = this._groundManager.shiftGroups() as Boo.Lang.Hash;
			if(group == null){
				return false;
			}
		
			var list:Array = group["list"] as Array;
			var ret:boolean = (list.length >= 3);
			
			if(ret){
				bp.reset(list.length);
				for(var j =0; j <list.length; ++j){
					var ball:EZBall = list[j] as EZBall;
					bp.push(ball.get3DPostion());
					allList.push(ball.removeTask());
					bType = ball.getType();
					_info.addRemove(bType);
				}
				position = bp.getPosition();
				return true;
			}
			return false;
		};
		
		 
		
		task.init = function(){
			allList = new Array();
			var ret:boolean = pickup();
			if(ret){
				over = false;
			}else{
				over = true;
			}
			for(var i0 =0; i0 <allList.length; ++i0 ){
				var task:Task = allList[i0] as Task;
				task.init();
			}
		};
		
		task.getCount = function(){
			return allList.length;
		
		};
		
		task.update = function(d:float){
			over = true;
			for(var i1 =0; i1 <allList.length; ++i1 ){
				var task1:Task = allList[i1] as Task;
				task1.update(d);
				var o:boolean = task1.isOver();
				if(!o){
					if(over){
						over = false;
					}
				}
			}
			
		};
		task.shutdown = function(){
			for(var i2 =0; i2 <allList.length; ++i2 )
			{
				var task:Task = allList[i2] as Task;
				task.shutdown();
			}
		};
		
		task.isOver = function (){
			return over;
		};
		task.hasMore = function(){
			return getGroundManager().hasGroup();
		};
		task.getBallType = function(){ 
			return bType;
		};
		
		task.getPosition = function(){
			return position;
		};
		return task;
	
	}
};
