#pragma strict
class EZMoveList extends MonoBehaviour{
	//private var offset:Array = null;
	public var _balls:EZBallsMultiArray = null;
	
	private var offset_ = MultiDim.Vector2Array(1, 1);
	private var mp_:Vector2;
	function Awake()
	{
		//var self = this;
	//	this.offset = new Array();
		this.release();
	}
	
	function release(){
		
		//var self =this;
	//	var matrix:Vector2 = Vector2(6, 5);//GameSetup.getInstance().matrix;
		offset_ = MultiDim.Vector2Array(_balls.width, _balls.height);
		offset_[0, 0] = Vector2(1,1);
		
		for(var x = 0; x< _balls.width; x++)
		{
			for(var y = 0; y<_balls.height; y++)
			{
				offset_[x, y] = Vector2(0,0);
			}
		}
	}
	
	function begin(bp:Vector2) 
	{
		this.mp_ = bp;
	}
	function getPoint() 
	{
		return this.mp_;
	}

	function moveX(ox:int) 
	{	
	
	
		var self =this;
	
		var matrix:Vector2 = GameSetup.getInstance().matrix;
		var y = this.mp_.y;
		for(var x = 0; x < matrix.x; x++)
		{
			var old = offset_[x, y];
			this.offset_[x, y] = Vector2(ox, old.y);
		}

	}
	
	function moveY(oy:int) 
	{
		
		
	
		var matrix:Vector2 = GameSetup.getInstance().matrix;

		
		var x = this.mp_.x;
		
		for(var y = 0; y < matrix.y; y++)
		{
		
			
			var old = offset_[x, y];
			this.offset_[x, y] = Vector2(old.x, oy);
			//var arr:Array = this.offset[x] as Array;
			//var p:Vector2 = arr[y];
		//	p.y = oy;
			//DebugStreamer.Log(this.offset_[x, y].ToString());
		}
		//this.mp.y = oy;
		
		return;
	/*
		var x = this.mp.x;
		var y = this.mp.y;
		this.offset[x][y].y = oy;
		this.offset[x][y + oy].y = -oy;
		return;
		*/
	}
	function getOffset(position:Vector2)
	{	
		//this.offset_[3, 3] = Vector2(1, 2);
		//DebugStreamer.Log(this.offset_[position.x, position.y].ToString());
		return this.offset_[position.x, position.y];
	
	}


};
