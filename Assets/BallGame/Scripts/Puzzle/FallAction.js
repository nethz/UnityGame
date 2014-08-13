#pragma strict

class FallAction{

	function FallAction(){
	
	}
	function upset(balls:MultiArray){
	
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var self = this;	
		var all_list:Array = new Array();
		for(var y= 0; y < matrix.y; ++y)
		{
			for(var x = 0 ;x < matrix.x; ++x)
			{
				var ball:Ball = balls.getObj(x, y) as Ball;
				ball.random();
			}
		}
	}
	function rebuild(balls:MultiArray){
	
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var self =this;
		var all_list:Array = new Array();
		for(var y= 0; y < matrix.y; ++y)
		{
			for(var x = 0 ;x < matrix.x; ++x)
			{
				var subtask:Task = this.fallTask(balls, x, y);
				if(subtask != null)
				{
					all_list.push(subtask);
				}
			}
		}
		
		var task:Task = new Task();
		
		
		var over:boolean = false;
		task.init = function(){
			for(var i =0; i< all_list.length; ++i){
				var t:Task = all_list[i] as Task;
				if(t!= null){
					t.init();
				}
			}
			over = false;
		};
		
		task.update = function(d:float){
			if(all_list.length == 0){
				over = true;
			}
			for(var i =0; i< all_list.length; ++i)
			{
				var t:Task = all_list[i] as Task;
				over = true;
				if(t!= null){
					t.update(d);
					var o:boolean = t.isOver();
					if(over && !o){
						over = false;
					}
				}
			}
		};
		task.isOver = function(){
			return over;
		};
		task.shutdown = function(){
			for(var i =0; i< all_list.length; ++i){
				var t:Task = all_list[i] as Task;
				t.shutdown();
			}
	//		this.context_.getSoundManager().quickPlay("sound_test");
		};
		
		
		
	
		return task;
		
	}

	function fallTask(balls:MultiArray, x:int, y:int){
	
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var self = this;
		var ball:Ball = balls.getObj(x, y) as Ball;
		var r:boolean = ball.getRemove();
		var hole:int = 0;
		var hole2:int = 0;
		if(r)
		{
		
			for(var fy1:int = 0; fy1 < matrix.y; ++fy1)
			{
				var ba:Ball = balls.getObj(x, fy1) as Ball;
				var r1:boolean = ba.getRemove();
				if(r1)
				{
					hole2++;//总共的
					if(fy1 > y)
					{
						hole++;//下面有几个
					}
				} 
			}
			//ball.random();
			return ball.newFallTask( Vector2(x, 5 + hole), Vector2(x, 5 - hole2 + hole));
		
			
		}else
		{
			for(var fy2:int = 0; fy2 < y; ++fy2)
			{
				var ba2:Ball = balls.getObj(x, fy2) as Ball;
				var r2:boolean = ba2.getRemove();
				if(r2)
				{
					hole++;
				}
				
			}
			
			var posi:Vector2 = ball.getPosition();
			if(hole != 0)
			{	
				var begin:Vector2 = ball.getPosition();
				return ball.moveTask(begin, Vector2(posi.x, posi.y - hole));
				
			}
			
			hole = 0;
		}
		
		
		return null;
	}
	
	
};