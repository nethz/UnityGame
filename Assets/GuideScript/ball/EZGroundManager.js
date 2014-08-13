#pragma strict

class EZGroundManager extends MonoBehaviour{
	public var _balls:EZBallsMultiArray = null;
	private var groups:Array = null;
	public function resetGroup()
	{
	 
		for(var x = 0; x<_balls.width; ++x)
		{
			for(var y = 0 ; y<_balls.height; ++y)
			{
				var ball:EZBall = _balls.getObj(x, y) as EZBall;
				
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
				var ball:EZBall = list[j] as EZBall;
				ball.setMark(true);
			}
			ret = true;
		
		}
		return ret;
	
	}
	
	function grouping(){
		var group = 0;
		this.resetGroup();
		
		this.groups = new Array();
		for(var x = 0; x<_balls.width; ++x)
		{
			for(var y = 0 ; y<_balls.height; ++y)
			{
				var ball:EZBall = _balls.getObj(x, y) as EZBall;
				if(ball != null && ball.getGroup() == -1)
				{
					var ballList:Array = this.findGroupWithLine( x, y, group, 3);
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
		if(groups != null)
			Debug.Log(this.groups.length);
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
	
	function isSameType(x1:int, y1:int, type:Geek.MagicType)
	{
		if(y1 >=_balls.height || x1 >=_balls.width || x1<0 || y1<0 )
			return false;
		
		var ball:EZBall = _balls.getObj(x1, y1) as EZBall;
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
			var ball:EZBall = b[n] as EZBall;
			var p = ball.getPosition();
			for(var i =0; i< ret.length; ++i)
			{
			
				var ball2:EZBall = ret[i] as EZBall;
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
	 

	function findGroupWithLine( x:int, y:int, group:int, min:int){
		
		var ret:Array = new Array();
		var processing:Array = new Array();
		var mainBall:EZBall = _balls.getObj(x,y) as EZBall;
		if(mainBall.getGroup() != -1)
			return;
		var type:Geek.MagicType = mainBall.getType();
		processing.push(mainBall);
		while(processing.length != 0)
		{
		
			
			var ball:EZBall = processing.shift() as EZBall;
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
				if(left && this.isSameType(p.x+i, p.y,type))
				{
					ret_x.push(_balls.getObj(p.x+i,p.y));
				}else
				{
					left = false;
				}
			
				
	
				if(right && this.isSameType(p.x-i, p.y,type))
				{
					ret_x.push(_balls.getObj(p.x-i,p.y));
				}else
				{
					right = false;
				}
				
				
				
				if(up && this.isSameType(p.x, p.y+i,type))
				{
					ret_y.push(_balls.getObj(p.x,p.y+i));
				}else
				{
					up = false;
				}
				if(down && this.isSameType(p.x, p.y-i,type))
				{
					ret_y.push(_balls.getObj(p.x,p.y-i));
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
					var ball_x :EZBall = ret_x[ix] as EZBall;
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
					
					var ball_y :EZBall = ret_y[iy] as EZBall;
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
