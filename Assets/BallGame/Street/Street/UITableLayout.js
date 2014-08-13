#pragma strict
class UITableLayout extends MonoBehaviour
{
	public var _matrix:Vector2;
	public var _cell:Rect;
	public var _percentageOffset:Rect = new Rect(0,0,0,0);
	public var _pixelOffset:Rect = new Rect(0,0,0,0);
	//protected var rect_:Rect = new Rect();
//	protected var scale_:Vector3 = new Vector3();
	/*
	public function get rect():Rect{
		return this.rect_;
	}*/
//	protected function format(rect:Rect){
	///	this.scale_ = Geek.GetWorldScale(this.transform);
	//	var unit:Vector2 = new Vector2(rect.width/this._matrix.x, rect.height/this._matrix.y);
		//this.rect_ =  new Rect(rect.x+  unit.x * this._cell.x, rect.y+  unit.y * this._cell.y, unit.x * this._cell.width,  unit.y * this._cell.height);
	//}
	
	public function doLayout(rect:Rect){
		var unit:Vector2 = new Vector2(rect.width/this._matrix.x, rect.height/this._matrix.y);
		var ret =  new Rect(rect.x+  unit.x * this._cell.x, rect.y+  unit.y * this._cell.y, unit.x * this._cell.width,  unit.y * this._cell.height);
		
		var scale:Vector3 = Geek.GetWorldScale(this.transform);
		doLayoutImpl(ret, scale);
		
	} 
	public function doLayoutImpl(rect:Rect, scale:Vector3){}

	public function hidden(){}
	public function show(){}
	
	public function set visible(value:boolean){
		if(value){
			this.show();
		}else{
			this.hidden();
		}
	}
}