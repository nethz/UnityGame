#pragma strict
import System.Collections.Generic;

class EZRandom extends MonoBehaviour{
	public var _n:int = 0;
	public var _number:BallType[] = null;
	enum BallType{
		Fire = 0,
		Wood = 1,
		Crystal = 2,
		Metal = 3,
		Earth = 4,
		Water = 5,
		None,
		
	}
	function range(min:float, max:float):float{
		var rand:float = 0.0f;
		if(_n < _number.Length){
			var number:int = _number[_n];
			rand = number;
			rand = rand%(max-min)+min;
			_n++;
		}else{
			rand = Random.Range(min, max);
		
		}
		
		return rand;
	}
}