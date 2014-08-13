#pragma strict
/*
class PuzzleInput{
	private var touch_:boolean = false;
	private var touching_:boolean = false;
	private var mousePosition_ = Vector2(0, 0);
	private var mouseKey_ = new Array(false, false, false);
	private var puzzle_:Puzzle = null;
	function PuzzleInput(puzzle:Puzzle){
		this.puzzle_ = puzzle;
	}
	
	
	function handleTouchMove(t:Touch){
		var position:Vector2 = t.position; 
		var position2:Vector2 = this.mousePosition_; 
		if(position2.x != position.x || position2.y != position.y) {
		 	this.mousePosition_ = t.position;
			var move_evt:MouseEvent = new MouseEvent(0, t.position);
			puzzle_.handleMouseMove(move_evt);
		}
		
	}
	
	function handleTouch()
	{
		for (var t:Touch in Input.touches) {
			if(t.phase == TouchPhase.Moved)
			{
				this.handleTouchMove(t);
			
			}else
			{
				
				var position:Vector2 = t.position; 
				this.mousePosition_ = position;
				var me:MouseEvent = new MouseEvent(0, t.position);
				if(!this.touching_ && t.phase == TouchPhase.Began){
					
					puzzle_.handleMouseDown(me);
					this.touching_ = true;
				}else if(this.touching_ && (t.phase == TouchPhase.Ended || t.phase == TouchPhase.Canceled)){
					puzzle_.handleMouseUp(me);
					this.touching_ = false;
				}
			
			}
				
			break;
		}
	
	}
	function handleInput(){
	
		if(!this.touch_)
		{
			for (var t:Touch in Input.touches) {
					this.touch_ = true;
					break;
				}
		}
		if(this.touch_)
		{
			this.handleTouch();
		}else{
		
			handleMouseMove();
			for(var i =0; i<3; ++i){
				var key = Input.GetMouseButton(i);
				if(key != mouseKey_[i])
				{
					var position:Vector2 = Input.mousePosition; 
					this.mousePosition_ = position;
					var me:MouseEvent = new MouseEvent(0, Input.mousePosition);
					mouseKey_[i] = key;
					if(key){
						puzzle_.handleMouseDown(me);
					///	
					}else{
						puzzle_.handleMouseUp(me);
					}
				}
			
				
			}
		}
		
			
	
	}
	
	function handleMouseMove(){
		var position:Vector2 = Input.mousePosition; 
		var position2:Vector2 = this.mousePosition_; 
			
		if(position2.x != position.x || position2.y != position.y) {
		
		 	this.mousePosition_ = position;
			var move_evt:MouseEvent = new MouseEvent(0, Input.mousePosition);
			puzzle_.handleMouseMove(move_evt);
		}
	}

};
*/