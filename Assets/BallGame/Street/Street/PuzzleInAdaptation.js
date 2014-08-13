#pragma strict

class PuzzleInAdaptation extends Adaptation {
	
	function getRect():Rect
	{
		var camera:Camera = this.getCamera();
		var rect:Rect = new Rect();
		//var autoSize:AutoSize = AutoSize.getInstance();
		
		var sizeSP:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getInSize(), camera.orthographicSize);
		var outSP:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getOutSize(), camera.orthographicSize);
		var osizeSP:Vector2 = Geek.Screen2Space(Vector2(0, camera.orthographicSize), camera.orthographicSize);
		rect.width = sizeSP.x;
		rect.height = sizeSP.y;
		rect.x = 0 - rect.width/2;
		rect.y = -camera.orthographicSize + sizeSP.y/2 -  rect.height/2 + outSP.y;
		return rect;
	}
	
};