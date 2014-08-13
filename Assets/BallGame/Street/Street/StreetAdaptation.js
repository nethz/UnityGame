#pragma strict

class StreetAdaptation extends Adaptation {
	function getRect():Rect
	{
		var camera:Camera = this.getCamera();
		var rect:Rect = new Rect();
		var autoSize:AutoSize = AutoSize.getInstance();
		var sizeSP:Vector2 = Geek.Screen2Space(autoSize.getRPGSize(), camera.orthographicSize);
		var osizeSP:Vector2 = Geek.Screen2Space(Vector2(0, _camera.orthographicSize), camera.orthographicSize);
		
		rect.width = sizeSP.y * 1;// this.rate_;
		rect.height = sizeSP.y;
		rect.x = 0 - rect.width/2;
		rect.y = -camera.orthographicSize + sizeSP.y/2 -  rect.height/2;
		
		return rect;
	}
	
};