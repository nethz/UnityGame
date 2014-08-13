#pragma strict

		
class EZAffixDBAttack extends EZAffixDBString{
	public var _mP6:float;
	public var _mP12:float;
	public var _mP18:float;
	//
	public function text(soul:JsonData.Soul):String{
	
		var ret:float = 0f;
		var mp:int = Mathf.RoundToInt(getMP(soul));
		var attack:float = getAttack(soul);
		switch(mp){
			case 6:
				ret = attack  * _mP6;
				break;
			case 12:
				ret = attack * _mP12;
				break;
			case 18:
				ret = attack * _mP18;
				break;
		}
		if(ret < 1f){
			ret = (Mathf.RoundToInt(ret * 100f))/100f;
		}else{
			ret = Mathf.RoundToInt(ret);
		}
		return ret + "";
	}
	
	private function getAttack(soul:JsonData.Soul):float{
		var ret:float = soul.baseProp.attack;
		return ret;
	}
	private function getMP(soul:JsonData.Soul):float{
		var ret:float = soul.magicProp.maxPower;
		return ret;
	}
}