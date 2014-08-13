#pragma strict
/*
class OutMoving{
	
	private var time_: float = 0;
	///private var outside_:boolean = false;
	private var move_:Vector2 = Vector2(0, 0);
	private var index_:int = 0;
	//private var intervals_ = new Array(0.3, 0.3, 0.2, 0.15);
	function addTime(d:float)
	{
		this.time_ += d;
	}
	function getTime(){
		return this.time_;
	}
	function getInterval(){
		var ret:float = 0.3;
		var gameSetup:GameSetup = GameSetup.getInstance();
		if(gameSetup != null && gameSetup.frequencies.length >0){
			ret = gameSetup.frequencies[this.index_];
		}
		return ret;
	}
	function nextInterval(){
		var gameSetup:GameSetup = GameSetup.getInstance();
		if(this.index_ < gameSetup.frequencies.length-1)
		{
			this.index_ ++;
		}
	}
	function trigger(){
		var interval:float = this.getInterval();
		if(this.time_ > interval){
			this.nextInterval();
			this.time_ -= interval;
			return true;
		}
		return false;
	}
	
	function reset(){
		if(time_ != 0 || this.index_ != 0)
		{
			this.time_ = 0;
			this.index_ = 0;
		}
	}
	function setTime(time:float){
		this.time_ = time;
	}
	//function getOutside(){
	//	return this.outside_;
	//}
	function getMove()
	{
		return this.move_;
	}
	/*
	function handleMouse(evt:PuzzleEvent){
		this.outside_ = evt.outside;
		
		
		if(this.outside_)
		{
			var ox:float = evt.inside.x - evt.position.x;// - offset.x;
			var oy:float = evt.inside.y - evt.position.y;// - offset.y;
			if(ox != 0 && oy != 0)
			{
				this.outside_ = false;
			
			}else{
				if(ox<0){
					this.move_ = Vector2(-1, 0);
				}else if(ox > 0)
				{
					this.move_ = Vector2(1, 0);
				}else if(oy > 0)
				{
					this.move_ = Vector2(0, 1);
				}else if(oy < 0){
					this.move_ = Vector2(0, -1);
				}
			} 
		
		}
	
	}
	
};*/