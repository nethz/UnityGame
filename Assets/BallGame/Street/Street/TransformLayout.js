#pragma strict
class TransformLayout extends UITableLayout
{
	
	
	public function doLayoutImpl(rect:Rect, scale:Vector3){
		//var scale = Geek.GetWorldScale(this.transform);
		//var unit:Vector2 = new Vector2(rect.width/this._matrix.x, rect.height/this._matrix.y);
		//this.rect_ = new Rect(rect.x+  unit.x * this._cell.x, rect.y+  unit.y * this._cell.y, unit.x * this._cell.width,  unit.y * this._cell.height);
		this.transform.position.x = rect.x + rect.width/scale.x/2;
		this.transform.position.y = rect.y + rect.height/scale.y/2;
	
	} 
	
	public function hidden(){
	
	}
	
	public function show(){
	
	}
	
}