#pragma strict

class GameSetup  extends MonoBehaviour{
	var frequencies:float[] = [0.1, 10000];
//	var fingerOffset:Vector2 = Vector2(0,0);
	var removeTime:float = 0.3;
	var spallTime:float = 0.3;
	var spallSpeed = 1;
	var fallTime:float = 0.3;
	var matrix:Vector2 = Vector2(6, 5);
	var lockingAlpha:float = 0.7;
	var lockedAlpha:float = 0.3;
	var throwTime:float = 0.8;
	var closeTime:float = 0.5;
	var openTime:float = 0.5;
	var isDebug:boolean = false;
	var ballMaxRotate:float = 10;
	var hitTextAccelerated = 0;
	var hitTextAllTime = 0.5;
	var passMagic:boolean = true;
	
	
	private static var instance_:GameSetup = null;
	
	//private var web_:WebSetupData = null;
	//public var _webJson:String;
	public var loaded:boolean;
	function Awake(){
		loaded = false;
		this.instance_ = this;
		
	}

	static function getInstance(){
		return this.instance_;
	}
	
};

