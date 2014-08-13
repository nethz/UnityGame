#pragma strict
class UICameraLayout extends UITableLayout
{
	public var _draggableCamera:UIDraggableCamera = null;
	public var _camera:Camera = null;
	public var _fullSize:float = 1f; 
	public function Awake(){
		_draggableCamera.scale.y = _fullSize;
	
	}
	public function doLayoutImpl(rect:Rect, scale:Vector3){
		var r:Rect = Geek.Space2Screen(rect, _camera.orthographicSize);
		
		var screenWidth:float = Screen.width;
		var screenHeight:float = Screen.height;
		
		 
		var ret:Rect = new Rect((screenWidth/2.0f + r.xMin)/screenWidth,
								(screenHeight/2.0f + r.yMin)/screenHeight,
								r.width/screenWidth,
								r.height/screenHeight
								);
								
		var size:float = _fullSize * ret.height;
	
		if (rect != camera.rect){
			camera.rect = ret;
		}
		if (camera.orthographicSize != size){
			camera.orthographicSize = size;
		}
	} 
	
	public function hidden(){
	//this._camera.
	//	camera = false;
	}
	
	public function show(){
	//	camera.active = true;
	}
	/*public function Update(){
		
	} */
}