#pragma strict

class EZView extends EZScreen{
	enum Seat{
		WeBattle = 0,
		WeBag1 = 1,
		WeBag2 = 2,
		FoeBattle = 3,
		FoeBag1 = 4,
		FoeBag2 = 5,
		Hero = 6,
		Rival = 7,
		All = 8,
		None = 9,
	};
	public var _offset:Vector3 = Vector3.zero;
	public var _offset5:Vector3 = Vector3.zero;
	
	public var _throwPrototype:GameObject;
	/*public var _player : EZPlayer = null;
	public var _foe:EZFoe = null;
	 */
	static private var instance_:EZView = null;
	
	public static function GetInstance():EZView{
		return instance_;
	}
	public function Awake(){
		instance_ = this; 
		
	}
	public function OnDestroy(){
		
	}

	
	public function throwTask():Task{
	
		
		return null;
	}
	
	public function changeTask():Task{
		
		return null;
	}
	public function getPet(id:int):EZPet{
		
		
		return null;
	}
	public function getPetContainer(id:int):EZViewContainer{
		
		return null;
	}
	
	public function postAction():ActionObj{
	
		
		return null;
	}

	
}