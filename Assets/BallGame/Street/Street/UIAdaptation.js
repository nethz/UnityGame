#pragma strict

class UIAdaptation extends Adaptation {


	function getRect():Rect
	{
	
		
		var camera:Camera = this.getCamera();
		var rect:Rect = new Rect();
		var autoSize:AutoSize = AutoSize.getInstance();
		
		var sizeSP:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getUISize(), camera.orthographicSize);
		var rpgSP:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getRPGSize(), camera.orthographicSize);
		
		
		var osizeSP:Vector2 = Geek.Screen2Space(Vector2(0, camera.orthographicSize), camera.orthographicSize);
		
		rect.width = sizeSP.x;
		rect.height = sizeSP.y;
		rect.x = 0 - rect.width/2;
		//Debug.Log(rpgSP);
		//Debug.Log(rpgSP);
		rect.y = 0;
		return rect;
	}
	
};