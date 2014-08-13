#pragma strict

class UIHomeAdaptation extends Adaptation {


	function getRect():Rect {
		Debug.LogWarning(this.gameObject.name);
		var camera:Camera = this.getCamera();
		var autoSize:AutoSize = AutoSize.getInstance(); 
		var temp =  Geek.Screen2Space(autoSize.homeRect, camera.orthographicSize);
		return Geek.Screen2Space(autoSize.homeRect, camera.orthographicSize);
	}
};