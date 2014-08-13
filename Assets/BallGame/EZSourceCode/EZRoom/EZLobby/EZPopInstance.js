#pragma strict

class EZPopInstance extends EZPop{
 	static private var instance_:EZPopInstance = null;
 	
	public var _camera:Camera = null; 
	private var camera_:Camera = null; 
	private var gameObject_:GameObject = null;
	public var _offset:GameObject = null;
	private var offset_:Vector3 = Vector3.zero;
	public function Awake(){ 
		super.Awake();
		instance_ = this;
	}
	public static function GetInstance():EZPopInstance{
		
		return instance_;
	}


	public function setPosition(camera:Camera, gameObject:GameObject, offset:Vector3, autoTurn:boolean){
	 	gameObject_ = gameObject;
	 	offset_ = offset;
	 	camera_ = camera;
	 	var p:Vector3 = gameObject_.transform.position + offset_;
		this.transform.position = _camera.ScreenToWorldPoint(camera.WorldToScreenPoint(p)); 
		var turn:boolean = false;
		if(autoTurn){
			if(p.x > camera.transform.position.x){
				turn = false;
			}else{
			
				turn = true;
			}
		
		}
		if(turn){
			_bg.transform.localRotation.y = 180f;
			_offset.transform.localPosition.x = 92;
		}else{
			_bg.transform.localRotation.y = 0f;
			_offset.transform.localPosition.x = -92;
		}
	}
	

}