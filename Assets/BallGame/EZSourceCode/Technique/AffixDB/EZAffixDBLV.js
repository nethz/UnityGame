#pragma strict

		
class EZAffixDBLV extends EZAffixDBString{
	public var _lv1:float;
	public var _lv2:float;
	public var _lv3:float;
	public var _lv4:float;
	public var _lv5:float;
	//
	public function text(soul:JsonData.Soul):String{
		var ret:float = 0;
		var name:String = this.gameObject.GetComponent(EZAffixDBInfoBase).type;
		var lv:int = getTechLv(name,soul);
		switch(lv){
			case 1:
				ret = _lv1;
				break;
			case 2:
				ret = _lv2;
				break;
			case 3:
				ret = _lv3;
				break;
			case 4:
				ret = _lv4;
				break;
			case 5:
				ret = _lv5;
				break;
		}
		return ret + "";
	}
	
	private function getTechLv(name:String,soul:JsonData.Soul):int{
		var tech:JsonData.TechInfo = soul.skillProp.tech;
		var techName:String = "";
		
		if(tech && tech.affixes){
			for(var i:int = 0; i<tech.affixes.length; ++i){
				techName= tech.affixes[i].toString("mark");
				if(name == techName){
					return tech.affixes[i].toInt("lv")+1;
				}
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