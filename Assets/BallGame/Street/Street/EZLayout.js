#pragma strict
class EZLayout extends MonoBehaviour
{
	//var getRect:Function = null;
	
	public function doLayout(callback:Function){
		callback(getRect());
	} 
	public function getRect():Rect{
		return new Rect();
	}
}