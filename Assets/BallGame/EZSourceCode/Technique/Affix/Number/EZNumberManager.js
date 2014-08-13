#pragma strict


class EZNumberManager{

	public static function Create(info:JsonData.JsonPack):EZNumber{ 
	
		var ret: EZNumber = null;
		switch(info.toString("type")){
		case "XPower": 
			ret = new EZNumberXPower(info);
			break;
		case "Fixed": 
			ret = new EZNumberFixed(info);
			break;
		case "Percent": 
			ret = new EZNumberPercent(info);
			break;
	//	case "Attacked": 
	//		ret = new EZNumberAttacked(info);
	//		break;
		case "DivFoes": 
			ret = new EZNumberDivFoes(info);
			break;
		
		}
		return ret;
	}
}