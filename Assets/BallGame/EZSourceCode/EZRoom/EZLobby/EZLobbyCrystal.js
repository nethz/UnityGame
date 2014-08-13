#pragma strict
class EZLobbyCrystal extends MonoBehaviour{
	public var _ball:EZLobbyBall = null;
	public var _base:EZLobbyCrystalBase = null;
	
	public function setup(data:JsonData.Crystal){
		_ball.setup(data);
		_base.setup(data);
		
	}
	
	public function open(){
		_ball.open();
		_base.open();
	}
	
	public function close(){
		_ball.close();
		_base.close();
	}

	public function Awake(){
		this.close();
	}
	
}