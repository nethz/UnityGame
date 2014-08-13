#pragma strict

class EZTouch extends InputHandler{
	public var _cursor:EZCursor[]; 
	public var _camera:Camera = null;
	private var n_:int = 0;
	private var isDown_:boolean = false;
	
	private static var instance_:EZTouch = null;
	public function Awake(){
		this.instance_ = this;
	}
	public static function GetInstance():EZTouch{
		return this.instance_;
	}
	public function OnDestroy(){
		this.instance_ = null;
	}
	
	
	
	public function inputDown(evt:MouseEvent){
		if(!isDown_){
			isDown_ = true;
			if(n_ >= _cursor.Length){
				n_ = 0;
			}
			var position:Vector2 = _camera.ScreenToWorldPoint(evt.position);
			_cursor[n_].transform.position.x = position.x;
			_cursor[n_].transform.position.y = position.y;
			_cursor[n_].touch();
			n_++;
		}
		
	}
	
	public function inputUp(evt:MouseEvent){
		
		isDown_ = false;
	}
	
	

}