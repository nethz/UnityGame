#pragma strict

		
class EZAffixDBAttack2 extends EZAffixDBString{
	public var _mP6:float;
	public var _mP12:float;
	public var _mP18:float;
	//
	public function text(soul:JsonData.Soul):String{
		var ret:int = 0;
		var mp:int = Mathf.RoundToInt(getMP(soul));
		switch(mp){
			case 6:
				ret = _mP6;
				break;
			case 12:
				ret = _mP12;
				break;
			case 18:
				ret =_mP18;
				break;
		}
		ret = Mathf.RoundToInt(ret);
		return ret + "";
	}
	private function getMP(soul:JsonData.Soul):float{
		var ret:float = soul.magicProp.maxPower;
		return ret;
	}
}