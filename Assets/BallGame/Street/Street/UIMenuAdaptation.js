#pragma strict

class UIMenuAdaptation extends Adaptation {


	function getRect():Rect
	{
		var camera:Camera = this.getCamera();
		var autoSize:AutoSize = AutoSize.getInstance();
		return Geek.Screen2Space(autoSize.menuRect, camera.orthographicSize);
	}
	
};