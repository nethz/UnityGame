#pragma strict
class EZTableLayout extends EZLayout
{
	
	/* public enum Style{
		Free,
		Fixed,
	}; */
	public var _matrix:Vector2;
	public var _cell:Rect;
	public var _percentageOffset:Rect = new Rect(0,0,0,0);
	public var _pixelOffset:Rect = new Rect(0,0,0,0);
	public var _adaptation:Adaptation = null;
	
	
	public function getRect():Rect{
		var rect:Rect = _adaptation.getRect();
		var unit:Vector2 = new Vector2(rect.width/this._matrix.x, rect.height/this._matrix.y);
		var ret =  new Rect(
		rect.x+  unit.x * this._cell.x + _percentageOffset.x , 
		rect.y+  unit.y * this._cell.y+ _percentageOffset.y, 
		unit.x * this._cell.width + _percentageOffset.width,  
		unit.y * this._cell.height + _percentageOffset.height
		);
		return ret;
	}

}