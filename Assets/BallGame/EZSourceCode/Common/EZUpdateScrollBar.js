#pragma strict

class EZUpdateScrollBar extends MonoBehaviour{
	public var _shortenLv:float = 1000.0f;
	public var _scrollBar:UIScrollBar;
	public var _camera:Camera;
	//public var _cameraReset:Vector3;
	public var _manager:Transform;
	public var _background:UIDragCamera;
	
	private var maxRect_:Vector2;
	private var minRect_:Vector2;
	private var bottomLeft_:Vector3;
	private var topRight_:Vector3;
	private var barValue_:float = 0;
	private var barSize_:float = 0;
	private var offsetY_:float = 1;
	private var offset_:float = 0;
	private var updateTimes:int = 0;
	private var oldCameraBottom_:float = 0;
	private var oldMaxRect_:Vector2;
	private var oldMinRect_:Vector2;
	private var showBar_:boolean = false;
	//private var isResetCamera_:boolean = false;
	
	
	public function Update(){
		UpdateScroll();
	}
	
	public function Start(){
		cameraBounds();
		oldCameraBottom_ =  bottomLeft_.y;
		//_cameraReset = _camera.gameObject.transform.localPosition;
	}
	
	private function cellsBounds(){		
		var cellsBounds_:Bounds = NGUIMath.CalculateAbsoluteWidgetBounds(_manager);
		this.minRect_ = Vector2(cellsBounds_.min.x, cellsBounds_.min.y);
		this.maxRect_ = Vector2(cellsBounds_.max.x, cellsBounds_.max.y);	
	}

	private function cameraBounds(){
		var bl:Vector3 = Vector3(_camera.rect.xMin * Screen.width, _camera.rect.yMin * Screen.height, 0f);
		var tr:Vector3 = Vector3(_camera.rect.xMax * Screen.width, _camera.rect.yMax * Screen.height, 0f);
		this.bottomLeft_ = _camera.ScreenToWorldPoint(bl);
		this.topRight_ = _camera.ScreenToWorldPoint(tr);
	}
	
	private function CalculateOutside():float{
		if (_manager == null || _manager.childCount == 0) return 0.0f;
		var outside:float = 0.0f;
		if(topRight_.y > maxRect_.y){
			outside = topRight_.y - maxRect_.y;
		}
		if(bottomLeft_.y < minRect_.y){
			outside = minRect_.y - bottomLeft_.y;
		}
		return outside;
	}

	public function UpdateScroll(){
	
		//resetCamera0();	
		
		oldMaxRect_ = maxRect_;
		oldMinRect_ = minRect_;
		
		cameraBounds();
		cellsBounds();
		
		if(oldMaxRect_ != maxRect_ || oldMinRect_ != minRect_){
			Debug.Log("cells is changed!!!!!!!!!");
			barSize_ = (topRight_.y - bottomLeft_.y)/(maxRect_.y - minRect_.y);
			if(barSize_ > 1){
				barSize_ = 1;
			}
			_scrollBar.barSize = barSize_;
			offsetY_ = oldCameraBottom_ - minRect_.y; 
			if(offsetY_ >= 0){
				showScrollbar(true);
				draggenable(true);
			}else{
				showScrollbar(false);
				draggenable(false);
			}
		}
		UpdateSize();
		UpdateValue();
	}
	
	private function UpdateSize(){
		var outsideHeight:float = CalculateOutside();
		if(outsideHeight > 0){
			if(_shortenLv <= 0){
				_shortenLv = 1;
			}
			var temp = outsideHeight/barSize_/_shortenLv;
				if(temp > 0.9){
					temp = 0.9;
				}
			var size = (1 - temp)*barSize_;
			_scrollBar.barSize = size;
		}else{
			_scrollBar.barSize = barSize_;
		}
		
	}
	private function UpdateValue(){
		offset_ = bottomLeft_.y - minRect_.y; 
		barValue_ =  offset_/offsetY_;		
		if(barValue_ < 0){
			barValue_ = 0;
		}
		if(barValue_ > 1){
			barValue_ = 1;
		}
		barValue_ = 1 - barValue_;
		_scrollBar.scrollValue = barValue_;
	}
	private function showScrollbar(enable:boolean){
		showBar_ = enable;
		if(enable){
			_scrollBar.alpha = 0.5f;
		}else{
			_scrollBar.alpha = 0;
		}
	}
	private function draggenable(enable:boolean){
		if(_background){
			_background.enabled = enable;
		}
		
		var cells:UIDragCamera[] = System.Array.ConvertAll(
			_manager.gameObject.GetComponentsInChildren(UIDragCamera), 
			function (component){component as UIDragCamera;}
		);
		if(cells.length > 0){
			for(var i:int = 0;i < cells.length;++i){
				cells[i].enabled = enable;
			}
		}
	}
	
	public function get isShowBar():boolean{
		return showBar_;
	}
	/*
	private function resetCamera0(){
		if(isResetCamera_){
			_camera.gameObject.transform.localPosition = _cameraReset;
			isResetCamera_ = false;
		}
	}
	
	public function set isResetCamera(value:boolean){
		isResetCamera_ = value;
	}*/
}