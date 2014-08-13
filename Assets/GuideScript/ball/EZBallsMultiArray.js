#pragma strict

class EZBallsMultiArray extends MonoBehaviour{
	
	public var _lines:EZBallsLine[] = null;
	
	function getObj(x:int, y:int){
		return this._lines[y].getObj(x);
	}
	function get width():int{
	
		return _lines[0].size;
	}
	function get height():int{
		return _lines.Length;
	}
	
	function get size():int{
		return this.height * this.width;
	
	}
	
	function setObj(x:int, y:int, obj:Object){
		this._lines[y].setObj(x, obj);
	}
	
	
}