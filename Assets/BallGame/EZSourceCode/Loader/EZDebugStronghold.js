#pragma strict

class EZDebugStronghold extends MonoBehaviour{

	private var _position: float = 0;
 
    
    public var _battle : String;
   	public var _battleDrop:int;
    public var _battleMoney:int;
    public var _bag1 : String;
   	public var _bag1Drop:int;
   	public var _bag1Money:int;
    public var _bag2 : String;
   	public var _bag2Drop:int;
    public var _bag2Money:int;
    
    
    
    
    
	public function getData(i:float):JsonData.Stronghold{
		_position = i;
		return debugStronghold();
	}
	private function debugMonster():JsonData.Monster{
		var monster:JsonData.Monster = new JsonData.Monster();
		
		
		
		 monster.natureProp = new JsonData.NatureProperty();
		 
		 monster.natureProp.style= "goblin";
		 monster.natureProp.type = "Fire";
		 monster.natureProp.group = 0;
		 
		 monster.baseProp = new JsonData.BaseProperty();
		 monster.baseProp.maxHealth= 100;
		 monster.baseProp.speed= 10;
		 monster.baseProp.attack= 3;
		return monster;
	}
	
	private function debugStronghold():JsonData.Stronghold{
		var stronghold:JsonData.Stronghold = new JsonData.Stronghold(); 
		
		stronghold.position = _position;
		stronghold.type = "Wild";
		
		
		stronghold.battle = new JsonData.ThePosition();
		stronghold.battle.soul = JsonData.Boss.Load(_battle);
		stronghold.battle.dropQuality = this._battleDrop;
		//stronghold.battle.pop = this._battlePop;
		//stronghold.battle.info = this._battleInfo;
		
		
		stronghold.bag1 = new JsonData.ThePosition();
		stronghold.bag1.soul = JsonData.Boss.Load(_bag1);
		stronghold.bag1.dropQuality = this._bag1Drop;
	//	stronghold.bag1.pop = this._bag1Pop;
		//stronghold.bag1.info = this._bag1Info;
		
		stronghold.bag2 = new JsonData.ThePosition();
		stronghold.bag2.soul = JsonData.Boss.Load(_bag2);
		stronghold.bag2.dropQuality = this._bag2Drop;
	//	stronghold.bag2.pop = this._bag2Pop;
		//stronghold.bag2.info = this._bag2Info;
		
		return stronghold;
	}
}
