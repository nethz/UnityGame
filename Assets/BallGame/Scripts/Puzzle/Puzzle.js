#pragma strict

class Puzzle extends InputHandler/*  extends InputHandler*/{
	public var _ballPrototype:GameObject = null;
	public var _adaptation:Adaptation;
	public var _ballsManager:BallsManager = null;
	//private var outMoving_:OutMoving = null;
//	private var ballsManager_:BallsManager = null;
	private var mousePosition:Vector2;
	private var mouseDown:boolean = false;
	private var ballLock: BallLock = null;
	private static var instance_:Puzzle = null;
	private var filter_:Filter = null;
	function Awake(){
	
	//	this._ballsManager = new BallsManager();
		this.filter_ = new Filter();
		this._ballsManager.awake();
	}
	function OnDestroy(){
		this._ballsManager.onDestroy();
	}
	function Start(){
		this._ballsManager.start();
		this.ballLock = null;
		this.transform.localPosition.z = 1000;
		var bs:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getBallSize(), PuzzleCamera.instance().orthographicSize);
		var matrix:Vector2 =  GameSetup.getInstance().matrix;
		var id =0;
		
		for(var x= 0; x< matrix.x; ++x)
		{
			for(var y=0; y < matrix.y; ++y){   
				
				var ball = GameObject.Instantiate(_ballPrototype);
				ball.transform.parent = this.transform;
				
				ball.name = "Ball(" + (id++) + ")"; 
				this.getBallsManager().createBall(x, y, ball);
			} 
		
		}
	
			
		
		this.getBallsManager().init();
	}	
	function Update() {
		var d:float = this.filter_.interval(Time.deltaTime);
		this.update(d);	
	}


	
	
	
	function getBallsManager(){
		return this._ballsManager;
	}
	protected function inputDown(evt:MouseEvent){
	
		this.handleDown(new PuzzleEvent(evt.opposite));
	}
	private function handleDown(evt:PuzzleEvent){
		this.mousePosition = evt.position;
		this.mouseDown = true;
		this.ballLock = this._ballsManager.locking(this.mousePosition) as BallLock;
		if(this.ballLock != null){
			var position:Vector2 = _ballsManager.point2ball(this.mousePosition);
			this.ballLock.getClone().setPosition(Vector2(position.x, position.y));
		} 
		this.handleMove(evt);
	}
	
	
	
	protected function inputMove(evt:MouseEvent){
		this.handleMove(new PuzzleEvent(evt.opposite));
	}
	private function handleMove(evt:PuzzleEvent){
		if(this.mouseDown == true && this.ballLock != null){
			var setup:GameSetup = GameSetup.getInstance();
			//var offset = Geek.Space2Screen(setup.fingerOffset, PuzzleCamera.instance().orthographicSize);


			var offset = Geek.Space2Screen(Vector2(0.0f, 8.0f), PuzzleCamera.instance().orthographicSize);
			var osize:float = PuzzleCamera.instance().orthographicSize;
			
			this.mousePosition = Geek.InsideAddOffset(evt.position, offset, PuzzleCamera.instance());
			//this.mousePosition = evt.position;// + offset;
			var position:Vector2 = this._ballsManager.point2ball(this.mousePosition);
			this.ballLock.getClone().setPosition(Vector2(position.x, position.y));
			this._ballsManager.moving(this.ballLock, this.mousePosition);
		}
		
	
	}

	protected function inputUp(evt:MouseEvent){
		this.handleUp(new PuzzleEvent(evt.opposite));
	}
	private function handleUp(evt:PuzzleEvent){
		this.mouseDown = false;
		this.mousePosition = Vector2.zero;
		if(this.ballLock != null)
		{
		 	this._ballsManager.unlock(this.ballLock);
			this.ballLock = null;
		}
	}
	function move(p:Vector2){
		var self = this;
	 	self.ballLock = self._ballsManager.relocking(this.ballLock, p);
	 	var position:Vector2 = _ballsManager.point2ball(this.mousePosition);
		this.ballLock.getClone().setPosition(Vector2(position.x, position.y ));
		this._ballsManager.moving(this.ballLock, this.mousePosition);
	
	}
	function update(d:float)
	{
		this._ballsManager.update(d);
	}
	
};