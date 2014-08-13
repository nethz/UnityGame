#pragma strict
class BallLock{
	
	function BallLock(){
	}
	private var xy_:Vector2 = Vector2(0, 0);
	private var ball_:Ball = null;
	private var clone_:BallClone = null;
	function getClone(){
		return this.clone_;
	}
	function setClone(clone:BallClone){
	
		this.clone_ = clone;
	}
	function getXY(){
		return this.xy_;
	}
	function setXY(xy:Vector2){
		this.xy_ = xy;
	}
	function getBall(){
		return this.ball_;
	}
	function setBall(ball:Ball)
	{
		this.ball_ = ball;
	}
	function release()
	{	
		this.ball_.unlock();
		this.clone_.release();
	}

};