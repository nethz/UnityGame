#pragma strict

class SquareAdaptation extends Adaptation {
	function getRect():Rect
	{
	
		
		
		var camera:Camera = this.getCamera();
		var rect:Rect = new Rect();
		var autoSize:AutoSize = AutoSize.getInstance();
		var sizeSP:Vector2 = Geek.Screen2Space(autoSize.getPuzzleSize(), camera.orthographicSize);
		var osizeSP:Vector2 = Geek.Screen2Space(Vector2(0, camera.orthographicSize), camera.orthographicSize);
		
		rect.width = sizeSP.x;
		rect.height = sizeSP.y;
		rect.x = 0 - rect.width/2;
		rect.y = camera.orthographicSize - sizeSP.y/2 -  rect.height/2;
		
		return rect;
	}
	
};