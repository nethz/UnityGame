#pragma strict
class EZConditionManager{
	static function Create(data:JsonData.JsonPack):EZAffixCondition{
		var ret:EZAffixCondition = null; 
		
		switch(data.toString("type")){
		case "Compare":
			ret = new EZCompareCondition(data);
			break;
		case "Order":
			ret = new EZOrderCondition(data);
			break;
		case "Health":
			ret = new EZHealthCondition(data);
			break;
		case "Dot":
			ret = new EZDotCondition(data);
			break;
		}
		return ret;
	}
};