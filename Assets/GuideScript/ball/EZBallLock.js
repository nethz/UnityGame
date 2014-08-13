#pragma strict
class EZBallLock{
	
	function BallLock(){
	}
	private var xy_:Vector2 = Vector2(0, 0);
	private var ball_:EZBall = null;
	private var clone_:EZBallClone = null;
	function getClone(){
		return this.clone_;
	}
	function setClone(clone:EZBallClone){
	
		this.clone_ = clone;
	}
	function getXY():Vector2{
		return this.xy_;
	}
	function setXY(xy:Vector2){
		this.xy_ = xy;
	}
	function getBall(){
		return this.ball_;
	}
	function setBall(ball:EZBall)
	{
		this.ball_ = ball;
	}
	function release()
	{	
		this.ball_.unlock();
		this.clone_.unlock();
	}

};
