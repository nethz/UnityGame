#pragma strict

class EZBallsLine extends MonoBehaviour{
	public var _balls:EZBall[] = null;
	
	function get size():int{
		return _balls.Length;
	}
	
	function getObj(n:int):EZBall{
		return _balls[n];
	
	}
	
	function setObj(n:int, ball:EZBall){
		_balls[n] = ball;
	}
}