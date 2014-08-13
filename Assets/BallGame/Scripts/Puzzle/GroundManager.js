#pragma strict

class GroundManager{
//	var context_:GameContext = null;
	var groups:Array = null;
	var b:boolean = true;
	function GroundManager()
	{
	}
	function resetGroup(balls:MultiArray)
	{
	 
		var self =this;
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		for(var x = 0; x<matrix.x; ++x)
		{
			for(var y = 0 ; y<matrix.y; ++y)
			{
				var ball:Ball = balls.getObj(x, y) as Ball;
				
				if(ball != null)
				{
					ball.setMark(false);
					ball.setGroup(-1);
				}
			}
		}
	
	}
	function mark()
	{
		var ret:boolean = false;
		for(var i = 0; i < this.groups.length; ++i)
		{
			var group:Boo.Lang.Hash = this.groups[i] as Boo.Lang.Hash;
			var list:Array = group["list"] as Array;
			for(var j =0; j <list.length; ++j )
			{
				var ball:Ball = list[j] as Ball;
				ball.setMark(true);
			}
			ret = true;
		
		}
		return ret;
	
	}
	
	function grouping(balls:MultiArray){
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var self = this;
		var group = 0;
		this.resetGroup(balls);
		
		this.groups = new Array();
		for(var x = 0; x<matrix.x; ++x)
		{
			for(var y = 0 ; y<matrix.y; ++y)
			{
				var ball:Ball = balls.getObj(x, y) as Ball;
				if(ball != null && ball.getGroup() == -1)
				{
					var ballList:Array = this.findGroupWithLine(balls, x, y, group, 3);
					if(ballList.length >= 3)
					{
						var group_obj = {'group':group , 'list':ballList};
						this.groups.push(group_obj);
					}
					group++;
				}
			}
			
		}
		return (this.groups.length  != 0);
	
	}
	function debug(){
	}
	function hasGroup()
	{
		if(this.groups != null && this.groups.length != 0)
			return true;
		return false;
	}
	function shiftGroups(){
		if(	this.hasGroup())
			return this.groups.shift();
		return null;
	}
	function getGroups()
	{
		return this.groups;
	}
	
	function isSameType(balls:MultiArray, x1:int, y1:int, type:Geek.MagicType)
	{
		var self = this;
		
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		if(y1 >=matrix.y || x1 >=matrix.x || x1<0 || y1<0 )
			return false;
		
		var ball:Ball = balls.getObj(x1, y1) as Ball;
		if(ball == null)
			return false;
		return (ball.getType() == type);
	}
	function concat(a:Array, b:Array)
	{
		var ret = a;
		for(var n = 0; n < b.length; ++n)
		{
			var t = true;
			var ball:Ball = b[n] as Ball;
			var p = ball.getPosition();
			for(var i =0; i< ret.length; ++i)
			{
			
				var ball2:Ball = ret[i] as Ball;
				var p1 = ball2.getPosition();
				if(p1.x == p.x && p1.y == p.y)
				{
					t = false;
					break;
				}
			}
			if(t)
			{
				ret.push(b[n]);
			}
		}
		return ret;
	}
	 
	function a()
	{  
		if(this.b)
			this.a();  
		
	}
	function findGroupWithLine(balls:MultiArray, x:int, y:int, group:int, min:int){
		
		var ret:Array = new Array();
		var processing:Array = new Array();
		var mainBall:Ball = balls.getObj(x,y) as Ball;
		if(mainBall.getGroup() != -1)
			return;
		var type:Geek.MagicType = mainBall.getType();
		processing.push(mainBall);
		while(processing.length != 0)
		{
		
			
			var ball:Ball = processing.shift() as Ball;
			ball.setGroup(group);
			ret.push(ball);
		
			var ret_x:Array = new Array();
			var ret_y:Array = new Array();
			ret_x.push(ball);
			ret_y.push(ball);
			var left:boolean = true; 
			var right:boolean = true;
			var up:boolean = true; 
			var down:boolean = true;
			var p:Vector2 = ball.getPosition();
			for(var i =1;;i++)
			{
				if(left && this.isSameType(balls,p.x+i, p.y,type))
				{
					ret_x.push(balls.getObj(p.x+i,p.y));
				}else
				{
					left = false;
				}
			
				
	
				if(right && this.isSameType(balls,p.x-i, p.y,type))
				{
					ret_x.push(balls.getObj(p.x-i,p.y));
				}else
				{
					right = false;
				}
				
				
				
				if(up && this.isSameType(balls,p.x, p.y+i,type))
				{
					ret_y.push(balls.getObj(p.x,p.y+i));
				}else
				{
					up = false;
				}
				if(down && this.isSameType(balls,p.x, p.y-i,type))
				{
					ret_y.push(balls.getObj(p.x,p.y-i));
				}else
				{
					down = false;
				}
				
				if((!left)&&(!right) && (!up)&&(!down))
				{
					break;
				}
			}
			
			
			if(ret_x.length >= min)
			{
				for(var ix = 1; ix< ret_x.length; ++ix)
				{
					var ball_x :Ball = ret_x[ix] as Ball;
					if(ball_x.getGroup() == -1)
					{
						processing.push(ball_x);
						ball_x.setGroup(group);
					}
				
				}
			}
			
			if(ret_y.length >= min)
			{
				for(var iy = 1; iy< ret_y.length; ++iy)
				{
					
					var ball_y :Ball = ret_y[iy] as Ball;
					if(ball_y.getGroup() == -1)
					{
						
						
						processing.push(ball_y);
						ball_y.setGroup(group);
					}
				}
			}
		}
		return ret;
	} 
	
	

};