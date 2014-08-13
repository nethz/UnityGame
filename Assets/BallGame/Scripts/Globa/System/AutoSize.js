#pragma strict
//screen 
class AutoSize{
	private var screenSize_:Vector2 = Vector2(0, 0);
	private var puzzleSize_:Vector2 = Vector2(0, 0);
	private var ballSize_:Vector2 = Vector2(0, 0);
	private var outSize_:Vector2 = Vector2(0, 0);
	private var inSize_:Vector2 = Vector2(0, 0);
	private var rpgSize_:Vector2 = Vector2(0, 0);
	private var uiSize_:Vector2  = Vector2(0, 0);
	private var menuRect_:Rect = Rect(0,0,1,1);
	private var homeRect_:Rect = Rect(0,0,1,1);
	public function get menuRect():Rect{
		return menuRect_;
	}
	public function get homeRect():Rect{
		return homeRect_;
	}
	function getScreenSize(){
		return this.screenSize_;
	}
	function getPuzzleSize(){
		return this.puzzleSize_;
	}
	function getBallSize(){
		return this.ballSize_;
	}
	function getOutSize(){
		return this.outSize_;
	}
	function getUISize(){
		return this.uiSize_;
	}
	function getOffset(camera:Camera){
		var oy:float = ( -(camera.GetScreenHeight()- this.getPuzzleSize().y - this.outSize_.y)/2);
//		Debug.Log(oy);
		return Vector2(0,oy);
	}
	function getInSize(){
		return this.inSize_;
	
	}
	function getRPGSize(){
		return this.rpgSize_;
	}
	private static var instance_:AutoSize = null;
	
	function AutoSize(){
	}
	static function getInstance(){
		if(this.instance_ == null){
			this.instance_ = new AutoSize();
		}
		this.instance_.planning(Screen.width, Screen.height);
		return this.instance_;
	}
	
	function planning(screenWidth:float, screenHeight:float){
		if(this.screenSize_.x != screenWidth ||this.screenSize_.y != screenHeight )
		{
			this.screenSize_ = Vector2(screenWidth, screenHeight);
			var tempHight:float = screenHeight/2;
		
			this.puzzleSize_ = Vector2(screenWidth, screenWidth * (5/6.45f));
			
			var nSize:float  = this.puzzleSize_.y/5;
			var tSize:float  = this.puzzleSize_.x/6.45;
			if(tSize< nSize){
				nSize = tSize;
			}
			
			this.ballSize_ = Vector2(nSize, nSize);
			this.outSize_ = Vector2(nSize/4, 0);
			this.inSize_ = Vector2(this.ballSize_.x * 6, this.ballSize_.y * 5);
			this.rpgSize_ = Vector2(screenWidth, (screenHeight - this.puzzleSize_.y));
			this.uiSize_ = new Vector2(screenWidth ,(screenHeight - this.puzzleSize_.y)*2/5);
			
			
			
			menuRect_ = new Rect(-screenWidth/2, -screenHeight/2, screenWidth, screenWidth/5);
			homeRect_ = new Rect(-screenWidth/2, -screenHeight/2, screenWidth, screenHeight);
		}
	}
	
	
	
	
	
	

};