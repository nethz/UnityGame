#pragma strict

class EZPuzzle extends EZInputHandler{
	public var _ballsManager:EZBallsManager = null;
	public var _offset:Vector2 = Vector2.zero;
	private var mousePosition:Vector2;
	private var mouseDown:boolean = false;
	private var ballLock: EZBallLock = null;
	private static var instance_:EZPuzzle = null;
	
	function Start(){
		this._ballsManager.start();
		this.ballLock = null;
		var bs:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getBallSize(), PuzzleCamera.instance().orthographicSize);
		var id =0;
		
		this.getBallsManager().init();
	}	
	

	
	
	
	function getBallsManager(){
		return this._ballsManager;
	}
	protected function inputDown(evt:EZMouseEvent){
	
		this.handleDown(evt);
	}
	private function handleDown(evt:EZMouseEvent){
		this.mousePosition = evt.position;
		this.mouseDown = true;
		this.ballLock = this._ballsManager.locking(this.mousePosition) as EZBallLock;
		if(this.ballLock != null){
			var position:Vector2 = _ballsManager.point2ball(this.mousePosition);
			this.ballLock.getClone().setPosition(evt.worldPoint);
			
		} 
		this.handleMove(evt);
	}
	
	
	
	protected function inputMove(evt:EZMouseEvent){
		this.handleMove(evt);
	}
	private function handleMove(evt:EZMouseEvent){
		if(this.mouseDown == true && this.ballLock != null){
			var setup:GameSetup = GameSetup.getInstance();
			
			this.mousePosition = evt.position + _offset;
			var position:Vector2 = this._ballsManager.point2ball(this.mousePosition);
			this.ballLock.getClone().setPosition(evt.worldPoint + _offset);
			
			
			this.mousePosition.x = Mathf.Clamp01(this.mousePosition.x);
			this.mousePosition.y = Mathf.Clamp01(this.mousePosition.y);
			
			
			if(this.mousePosition.x == 1.0f){
				this.mousePosition.x = 0.99999f;
			}
			if(this.mousePosition.y == 1.0f){
				this.mousePosition.y = 0.99999f;
			}
			
			
			this._ballsManager.moving(this.ballLock, this.mousePosition);
		}
		
	
	}

	protected function inputUp(evt:EZMouseEvent){
		this.handleUp(evt);
	}
	private function handleUp(evt:EZMouseEvent){
		this.mouseDown = false;
		this.mousePosition = Vector2.zero;
		if(this.ballLock != null)
		{
		 	this._ballsManager.unlock(this.ballLock);
			this.ballLock = null;
		}
	}

	
	
};
