#pragma strict

		
class EZAffixDBAtcByLVMP extends EZAffixDBString{
	public var _lv1:int;
	public var _lv2:int;
	public var _lv3:int;
	public var _lv4:int;
	public var _lv5:int;
	
	public var _mP6:float;
	public var _mP12:float;
	public var _mP18:float;
	//
	public function text(soul:JsonData.Soul):String{
		var ret:int = 0;
		var name:String = this.gameObject.GetComponent(EZAffixDBInfoBase).type;
		var lv:int = getTechLv(name,soul);
		var mp:int = Mathf.RoundToInt(getMP(soul));
		
		var soulLv:float = 0;
		var soulMp:float = 0;
		
		switch(lv){
			case 1:
				soulLv = _lv1;
				break;
			case 2:
				soulLv = _lv2;
				break;
			case 3:
				soulLv = _lv3;
				break;
			case 4:
				soulLv = _lv4;
				break;
			case 5:
				soulLv = _lv5;
				break;
		
		}
		
		switch(mp){
			case 6:
				soulMp =  _mP6;
				break;
			case 12:
				soulMp = _mP12;
				break;
			case 18:
				soulMp =  _mP18;
				break;
		}
		ret  = soulLv * soulMp;
		ret = Mathf.RoundToInt(ret);
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