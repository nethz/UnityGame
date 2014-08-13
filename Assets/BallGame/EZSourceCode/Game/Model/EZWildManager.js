#pragma strict

class EZWildManager extends MonoBehaviour {

	public var _battle:EZModelFoe = null;
	public var _bag1:EZModelFoe = null;
	public var _bag2:EZModelFoe = null;
	
	public function selectBattle():boolean{
		Debug.Log("battle");
		if(!_bag1.soul.alive && !_bag2.soul.alive && _battle.soul.alive && !_battle.isTargeted){
			_battle.isTargeted = true;
			_bag1.isTargeted = false;
			_bag2.isTargeted = false;
			return true;
		}else{
			_battle.isTargeted = false;
			_bag1.isTargeted = false;
			_bag2.isTargeted = false;
		}
		return false;
	}
	public function selectBag1():boolean{
		if(_bag1.soul.alive){
			if(_bag1.isTargeted){
				_bag1.isTargeted = false; 
			}else{ 
				_bag1.isTargeted = true;
				_battle.isTargeted = false;
				_bag2.isTargeted = false;
				return true;
			}
		}else{
			
			_battle.isTargeted = false;
			_bag1.isTargeted = false;
			_bag2.isTargeted = false;
		}
		return false;
	}
	public function selectBag2():boolean{
		if(_bag2.soul.alive){
			if(_bag2.isTargeted){ 
				_bag2.isTargeted = false; 
			}else{ 
				_bag2.isTargeted = true; 
				_battle.isTargeted = false;
				_bag1.isTargeted = false;
				return true;
			}
		}else{
			
			_battle.isTargeted = false;
			_bag1.isTargeted = false;
			_bag2.isTargeted = false;
		}
		return false;
	}
	public function select(seat:EZSoul.Seat):boolean{
		var ret:boolean = false;
		switch(seat){
		case EZSoul.Seat.FoeBattle:
			ret = selectBattle();
			break;
		case EZSoul.Seat.FoeBag1:
			ret = selectBag1();
			break;
		case EZSoul.Seat.FoeBag2:
			ret = selectBag2();
			break;
		}
		return ret;
	
	}
	public function get battle():EZModelFoe{
		return _battle;
	}
	public function get bag1():EZModelFoe{
		return _bag1;
	}
	public function get bag2():EZModelFoe{
		return _bag2;
	}

	function comeIn(stronghold:EZStronghold)
	{ 
	
		_battle.isTargeted = false;
		_bag1.isTargeted = false;
		_bag2.isTargeted = false;
		_battle.comeIn(stronghold.battle);
		_bag1.comeIn(stronghold.bag1);
		_bag2.comeIn(stronghold.bag2);
		
	}
	
	
	
}