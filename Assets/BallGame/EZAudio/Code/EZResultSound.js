#pragma strict

class EZResultSound extends MonoBehaviour{
	public var win_:EZSound = null;
	public var fail_:EZSound = null;

	public function playWin(){
		win_.play();
	}
	
	public function playFail(){
		fail_.play();
	}
}