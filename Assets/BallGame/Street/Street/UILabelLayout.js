#pragma strict
class UILabelLayout extends UITableLayout
{
	public var _label:UIWidget = null;
	
	public function doLayoutImpl(rect:Rect, scale:Vector3){
		//var scale = Geek.GetWorldScale(this.transform);
		//var unit:Vector2 = new Vector2(rect.width/this._matrix.x, rect.height/this._matrix.y);
	//	this.rect_ = new Rect(rect.x+  unit.x * this._cell.x, rect.y+  unit.y * this._cell.y, unit.x * this._cell.width,  unit.y * this._cell.height);
		this.transform.position.x = rect.x ;
		this.transform.position.y = rect.y + scale.y * rect.height/scale.y/2;
	} 
	
	
	function hidden(){
		if(this._label){
			this._label.enabled = false;
		}
	}
	
	function show(){
		if(this._label){
			this._label.enabled = true;
		}
	}
}