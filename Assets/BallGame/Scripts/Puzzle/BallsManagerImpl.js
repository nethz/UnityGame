#pragma strict

class BallsManagerImpl
{
	private var balls:MultiArray = null;
	private var moveList:MoveList = null;
	private var groundManager:GroundManager = null;
	private var fallAction:FallAction = null;
	private var time_:float = 0;
	private var change_:boolean = false;
	function BallsManagerImpl(){
		var matrix:Vector2 = Vector2(6, 5);//GameSetup.getInstance().matrix;
		this.balls = new MultiArray(matrix.x, matrix.y);
		this.moveList = new MoveList();
		this.groundManager = new GroundManager();
		this.fallAction = new FallAction();
		registerTask();
	} 
	function getGroundManager(){
		return this.groundManager;
	}
	function locking(position:Vector2){
		var self = this;
		var bl:BallLock = new BallLock();
		var xy:Vector2 = this.point2ball2cell(position);
		bl.setXY(xy);
		var ball:Ball = this.balls.getObj(xy.x, xy.y) as Ball;
		bl.setBall(ball);
		bl.setClone(ball.clone());
		bl.getBall().locking();
		this.moveList.begin(xy);
		return bl;
	}
	
	function unlock(lk:BallLock){
		lk.release();
	}
	function relocking(lk:BallLock, p:Vector2){
	
		var self = this;
		var pos:Vector2 = lk.getBall().getPosition();
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		
		var xy:Vector2 = Vector2(pos.x+p.x, pos.y+p.y);
		if(xy.x < 0){
			xy.x =0;
		}else if(xy.x >= matrix.x){
			xy.x = matrix.x -1;
		}
		if(xy.y < 0){
			xy.y =0;
		}else if(xy.y >= matrix.y){
			xy.y = matrix.y -1;
		}
		
		this.unlock(lk);
		lk.setXY(xy);
		var ball:Ball = this.balls.getObj(lk.getXY().x, lk.getXY().y) as Ball;
		lk.setBall(ball);
		lk.setClone( ball.clone());
		lk.getBall().locking();
		this.moveList.begin(lk.getXY());
		return lk;
		
	}
	
	function clearChange(){
		this.change_ = false;
	}
	function isChange(){
		return this.change_;
	}
	
	function moving(lk:BallLock, p:Vector2):boolean{
		
		var self = this;
		var xy:Vector2 = this.point2ball2cell(p);
		var pos:Vector2 = lk.getBall().getPosition();
		
		
		if(xy.x != pos.x || xy.y != pos.y)
		{
			this.change_ = true;
			if(xy.x != pos.x)
			{
				self.moveList.moveX(xy.x-pos.x);
				
			}else if(xy.y != pos.y){
				self.moveList.moveY(xy.y-pos.y);
			}
			
			var point:Vector2 = self.moveList.getPoint();
			
			var matrix:Vector2 = GameSetup.getInstance().matrix;
			for(var x=0; x <matrix.x; x++){
				for(var y = 0; y < matrix.y; y++)
				{
				
					var ball:Ball = this.balls.getObj(x, y) as Ball;
					
					if(ball != null)
					{
						var offset:Vector2 = this.moveList.getOffset(Vector2(x, y));
						ball.setOffset(offset);
					}
				}
			}
			
			var the_ball:Ball = this.balls.getObj(point.x, point.y) as Ball;
			var posi:Vector2 = the_ball.getPosition();
			this.moveList.release();
			this.rebuild();
			this.moveList.begin(posi);
			this.getGroundManager().grouping(this.balls);
			this.getGroundManager().mark();
			return true;
		}else{
		
			return false;
		}
		
	}
	function rebuild(){
		var self = this;
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var newballs:MultiArray = new MultiArray(matrix.x, matrix.y);
		
		for(var x=0; x <matrix.x; x++)
		{
			for(var y = 0; y <matrix.y; y++)
			{	
				var ball:Ball = this.balls.getObj(x, y) as Ball;
				if(ball != null)
				{
					var p:Vector2 = ball.getPosition();
					newballs.setObj(p.x, p.y, ball);
				}
			}
		}
		this.balls = newballs;
	
	}
	
	function update(d:float){
		
		var self = this;
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		for(var x=0; x <matrix.x; x++)
		{
			for(var y = 0; y < matrix.y; y++)
			{ 
				var ball:Ball = this.balls.getObj(x, y) as Ball;
				if(ball != null)
					ball.update(d);
				
			}
		}
	
	}
	function createBall(x:int, y:int, view:BallBind){
		var ball:Ball = new Ball(view);
		ball.random();
		this.addBall(x, y, ball);
		return ball;  
	}
	
	function addBall(x:int, y:int, ball:Ball){
		var self =this;
		this.balls.setObj(x, y, ball);
	
	}
	function init(){
		var self =this;
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var id = 0;
		for(var x=0; x <matrix.x; x++){
			for(var y = 0; y <matrix.y; y++){	
				var ball:Ball = this.balls.getObj(x, y) as Ball;
				ball.init(id++);
				//ball.random();
				ball.setPosition(Vector2(x, y));
			}
		}
		
		while(self.groundManager.grouping(self.balls)){
			self.fallAction.upset(self.balls);
		}
		
	}
	function registerTask(){
		TaskManager.registerTask("puzzle.group", this.groupTask);
		TaskManager.registerTask("puzzle.remove", this.removeTask);
		TaskManager.registerTask("puzzle.fall", this.fallTask);
	}
	
	function unregisterTask(){
		TaskManager.unregisterTask("puzzle.group");
		TaskManager.unregisterTask("puzzle.remove");
		TaskManager.unregisterTask("puzzle.fall");
	}
	function readly(){
		// n:int = this.balls.length; 
		return true;
	}
	function point2ball(p:Vector2){///!!! 
		var self = this;
		var bs:Vector2 = AutoSize.getInstance().getBallSize();
		var x = ((p.x)/ (bs.x));
		var y = ((p.y)/ (bs.y));
		return Vector2(x, y);
	}
	function point2ball2cell(p:Vector2){
		var xy = this.point2ball(p);
		var x = Mathf.Floor(xy.x);
		var y = Mathf.Floor(xy.y);
		return Vector2(x, y);
	}
	function groupTask(){
		var self = this;
		var task:GroupTask = new GroupTask();
		var success = false;
		task.init = function(){
			success = self.groundManager.grouping(self.balls);
		};
		task.success = function(){
			return success;
		};
		return task;
	
	}
	function fallTask(){
		var self = this;
		var task:Task = new Task();
		var fallTask:Task = null;
		
		task.init = function(){
			fallTask = self.fallAction.rebuild(self.balls);
			fallTask.init();
			self.rebuild();
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
	function removeTask(){
		var self = this;
		var task:RemoveTask = new RemoveTask();
		
		 
		var over = false;
		var allList:Array = null;
		var position = Vector3(0,0,0);
		var bType:Geek.MagicType = Geek.MagicType.None;
		var bp:BallPosition = new BallPosition(1);
		
		var _info:RemoveInfo=null;
		task.setInfoAccepted = function(info:RemoveInfo){
			_info = info;
		};
		
		var pickup = function(){
		
			var group:Boo.Lang.Hash = this.groundManager.shiftGroups() as Boo.Lang.Hash;
			if(group == null){
				return false;
			}
		
			var list:Array = group["list"] as Array;
			var ret:boolean = (list.length >= 3);
			
			if(ret){
				bp.reset(list.length);
				for(var j =0; j <list.length; ++j){
					var ball:Ball = list[j] as Ball;
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
			return self.getGroundManager().hasGroup();
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