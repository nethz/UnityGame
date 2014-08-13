#pragma strict

class EZBallFailTalk extends EZFailTalk{
	public var _text:String = "";
	private var powers_:int = 0;
	private var n_:int = 0;
	
	private static var instance_:EZBallFailTalk = null;
	function Awake(){
		this.instance_ = this;
		n_ = 0;
		powers_ = 0;
	}
	
	public static function GetInstance():EZBallFailTalk{
		return instance_;
	}
	public function addHit(power:int){
		powers_ += power;
		
	}
	public function close(){
		n_ += 1;
	}
	public function getText():String{
		var level:JsonData.LevelData = _loader.loadLevel();
		if(level.minPower >= powers_){
			return _text;
		
		}
		return null;
	}
	
	
}