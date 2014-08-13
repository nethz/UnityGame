#pragma strict

		
class EZAffixDBMagicByLVMP extends EZAffixDBString{
	public var _lv1mP6:float;
	public var _lv1mP12:float;
	public var _lv1mP18:float;
	public var _lv2mP6:float;
	public var _lv2mP12:float;
	public var _lv2mP18:float;
	public var _lv3mP6:float;
	public var _lv3mP12:float;
	public var _lv3mP18:float;
	public var _lv4mP6:float;
	public var _lv4mP12:float;
	public var _lv4mP18:float;
	public var _lv5mP6:float;
	public var _lv5mP12:float;
	public var _lv5mP18:float;

	//
	public function text(soul:JsonData.Soul):String{
		var ret:float = 0f;
		var name:String = this.gameObject.GetComponent(EZAffixDBInfoBase).type;
		var lv:int = getTechLv(name,soul);
		var mp:int = Mathf.RoundToInt(getMP(soul));
		
		switch(lv){
			case 1:
				switch(mp){
					case 6:
					ret =  _lv1mP6;
					break;
					case 12:
					ret = _lv1mP12;
					break;
					case 18:
					ret =  _lv1mP18;
					break;
				}
			break;
			case 2:
				switch(mp){
					case 6:
					ret =  _lv2mP6;
					break;
					case 12:
					ret = _lv2mP12;
					break;
					case 18:
					ret =  _lv2mP18;
					break;
				}
			break;
			case 3:
				switch(mp){
					case 6:
					ret =  _lv3mP6;
					break;
					case 12:
					ret = _lv3mP12;
					break;
					case 18:
					ret =  _lv3mP18;
					break;
				}
			break;
			case 4:
				switch(mp){
					case 6:
					ret =  _lv4mP6;
					break;
					case 12:
					ret = _lv4mP12;
					break;
					case 18:
					ret =  _lv4mP18;
					break;
				}
			break;
			case 5:
				switch(mp){
					case 6:
					ret =  _lv5mP6;
					break;
					case 12:
					ret = _lv5mP12;
					break;
					case 18:
					ret =  _lv5mP18;
					break;
				}
			break;
		}
		return ret + "";
	}
	
	private function getMP(soul:JsonData.Soul):float{
		var ret:float = soul.magicProp.maxPower;
		return ret;
	}
	
	private function getTechLv(name:String,soul:JsonData.Soul):int{
		var tech:JsonData.TechInfo = soul.skillProp.tech;
		var techName:String = "";
		for(var i:int = 0; i<tech.affixes.length; ++i){
			techName= tech.affixes[i].toString("mark");
			if(name == techName){
				return tech.affixes[i].toInt("lv")+1;
			}
		}
		tech = soul.magicProp.tech;
		for(var j:int = 0; j<tech.affixes.length; ++j){
			techName = tech.affixes[j].toString("mark");
			if(name == techName){
				return tech.affixes[j].toInt("lv")+1;
			}
		}
		return -1;
	}
}