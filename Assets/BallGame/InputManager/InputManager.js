#pragma strict

class InputManager extends MonoBehaviour{
	public var _camera:Camera;
	public var handlers:InputHandler[];
	private var touch_:boolean = false;
	private var enable_:boolean = false;
	private var mousePosition_ = Vector2(0, 0);
	private var currHandler_:InputHandler = null;
	public function doDown(evt:MouseEvent){
		if(this.currHandler_ != null)
			return;
		for(var i:int = 0; i < handlers.Length; ++i){
			var handler:InputHandler = handlers[i];
			if(handler.layout){ 
				var oldr:Rect = handler.layout.getRect();
				var rect:Rect = Geek.Space2Screen(oldr, _camera.orthographicSize);
				var ret:boolean = rect.Contains(Vector2(evt.position.x - Screen.width/2, evt.position.y - Screen.height/2));
				if(ret){
					this.currHandler_ = handler;
					this.currHandler_.doDown(evt, _camera);
				}
			}else{  
				this.currHandler_ = handler;
				this.currHandler_.doDown(evt, _camera);
			}
		}
	
	}
	public function doUp(evt:MouseEvent){
	
		if(this.currHandler_)
		{
			this.currHandler_.doUp(evt, _camera);
			this.currHandler_ = null;
		}
	}
	public function doMove(evt:MouseEvent){
		
		if(this.currHandler_)
		{
			this.currHandler_.doMove(evt, _camera);
		}
	}
	public function OnPress(press:boolean){
	
		if(press){
			doDown(new MouseEvent(0, UICamera.lastTouchPosition));
		}else{
			doUp(new MouseEvent(0,  UICamera.lastTouchPosition));
		}
	}
	public function OnDrag(delta:Vector2){
		doMove(new MouseEvent(0, UICamera.lastTouchPosition));
	}
	/*
	function handleTouchMove(t:Touch){
		if(this.mousePosition_ != t.position) {
		 	this.mousePosition_ = t.position;
			var move_evt:MouseEvent = new MouseEvent(0, t.position);
			this.doMove(move_evt);
		}
	}
	function isTouch(){	
		return touch_;
	}
	function handleTouch(){
	
		for (var t:Touch in Input.touches) {
			if(t.phase == TouchPhase.Moved){
				this.handleTouchMove(t);.position
			}else{
				var position:Vector2 = t.position; 
				this.mousePosition_ = position;
				var me:MouseEvent = new MouseEvent(0, t.position);
				if(!this.enable_ && t.phase == TouchPhase.Began){
					this.doDown(me);
					this.enable_ = true;
				}else if(this.enable_ && (t.phase == TouchPhase.Ended || t.phase == TouchPhase.Canceled)){
					this.doUp(me);
					this.enable_ = false;
				}
			
			}
				
			break;
		}
	
	}
	function handleInput(){
		if(!this.touch_ &&	Input.touchCount != 0)
		{
			this.touch_ = true;
		}
		
		if(this.touch_)
		{
			this.handleTouch();
		}else{
		
			handleMouseMove();
			var key = Input.GetMouseButton(0);
			if(key != enable_)
			{
				var position:Vector2 = Input.mousePosition; 
				this.mousePosition_ = position;
				var me:MouseEvent = new MouseEvent(0, Input.mousePosition);
				enable_ = key;
				if(key){
					this.doDown(me);
					
				}else{
					this.doUp(me);
				}
			}
		}
	}
	
	function handleMouseMove(){
		if(this.enable_)
		{
			if(this.mousePosition_ != Input.mousePosition) {
			 	this.mousePosition_ = Input.mousePosition;
				var evt:MouseEvent = new MouseEvent(0, Input.mousePosition);
				this.doMove(evt);
			}
		}
	}
	
	
	
	public function Update(){
		this.handleInput();
	
	}
	*/
}