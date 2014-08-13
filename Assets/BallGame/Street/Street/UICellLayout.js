#pragma strict
class UICellLayout extends UITableLayout
{
	
	private var cells_:UICell[] = null;
	private var rect_:Rect;
	private var scale_:Vector3;
	public var _padding:Vector2;
	public var _cellsMatrix:Vector2;
	private var oldPosition_:Vector2;
	private var visible_:boolean = true;
	private var enable_:boolean = false;
	private var repositionNow_:boolean = false;
	public var _z:float = 0;
	public function set repositionNow(value:boolean){
		this.repositionNow_ = value;
	}
	
	public function get cellCount():int{
		return _cellsMatrix.x * _cellsMatrix.y;
	}
	private function lateUpdate(){
		if(!this.enable_)
		{	
			return;
		}
		this.cells_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(UICell), 
				function (component){component as UICell;}
				);
		 
		
		System.Array.Sort(this.cells_, 
   	 		function(a:UICell, b:UICell):int
   	 		{	
   	 			if( a.sortIndex < b.sortIndex) return -1; return 0;
   	 		}
 		);
 		var offset:Vector2 = Vector2(this.transform.position.x, this.transform.position.y) - oldPosition_;
 		
		var unit:Vector2 = new Vector2(rect_.width/_cellsMatrix.x, rect_.height/_cellsMatrix.y);
		for(var i:int = 0; i < this.cells_.Length; ++i){
			var x:int = i%(_cellsMatrix.x); 
			var y:int = _cellsMatrix.y - 1- Mathf.Floor(i/(_cellsMatrix.x));
			var position:Vector2 = new Vector2(rect_.x +x* unit.x, rect_.y + y* unit.y) + offset; 
			var padding:Vector2 = new Vector2(unit.x*(_padding.x), unit.y*(_padding.y));   
			var rect:Rect = new Rect(position.x +padding.x, position.y +padding.y, unit.x - 2*padding.x , unit.y - 2*padding.y);
			this.cells_[i].doLayout(Rect(position.x +padding.x, position.y +padding.y, unit.x - 2*padding.x , unit.y - 2*padding.y), this._z, scale_);
		} 
		refresh();
		
	}
	public function doLayoutImpl(rect:Rect, scale:Vector3){
		//Debug.Log("###" + rect + this.gameObject);
		this.rect_ = rect;
		this.scale_ = scale;
		this.oldPosition_.x = rect.x ;
		this.oldPosition_.y = rect.y + scale.y * rect.height/scale.y/2;
		this.transform.position.x = oldPosition_.x;
		this.transform.position.y = oldPosition_.y;
		enable_ = true;
		lateUpdate();	
		
	} 
	private function refresh(){
		if(this.cells_ != null){
			for(var i:int = 0; i < this.cells_.Length; ++i){
				this.cells_[i].visible = visible_;
			}
		}
	}
	public function hidden(){
		
		visible_ = false;
		refresh();
		
	}
	
	public function show(){
		  
		visible_ = true;
		refresh();
		
	}
	public function Update(){
		if(repositionNow_ == true){
			lateUpdate();
			repositionNow_ = false;
		}
	
	}
	
}