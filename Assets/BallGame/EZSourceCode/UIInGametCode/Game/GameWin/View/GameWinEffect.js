#pragma strict

class GameWinEffect extends MonoBehaviour{
	static protected var speed_:float = 1.0f;
	static public function SetSpeed(speed:float){
		speed_ = speed;
	}
	public function effectTask():Task{
		return new Task();
	}
}