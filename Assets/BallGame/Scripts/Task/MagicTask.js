#pragma strict

class MagicTask extends Task {
	
	var setEnd:Function = null;
	var setBallType:Function = null;
	var getBallType:Function = null;
	var setBegin:Function = null;
	var setAllTime:Function = null;
	var testBallType:Function = null;
	var ignore:Function = null;
	var setPower:Function = null;
	
	private var BallType_:Geek.MagicType = Geek.MagicType.None;
	function MagicTask(){
		this.setBallType = this.setBallTypeImpl;
		this.getBallType = this.getBallTypeImpl;
	}
		
	private function setBallTypeImpl(BallType:Geek.MagicType){
		this.BallType_ = BallType;
	}
	
	private function getBallTypeImpl() : Geek.MagicType {
		return this.BallType_;
	}
};