#pragma strict

class EZDotCondition extends EZAffixCondition{

	private var has_:boolean = true;
	private var dot_:String = "dot";
	private var magicType_:Geek.MagicType = Geek.MagicType.None;
	
	public function EZDotCondition(condition:EZDotCondition){
		has_ = condition.has_;
		dot_ = condition.dot_;
		magicType_ = condition.magicType_;
	}
	
	public function EZDotCondition(data:JsonData.JsonPack){
		has_ = data.toBoolean("has");
		dot_ = data.toString("dot");
		magicType_ = Geek.GetMagicType(data.toString("magicType"));
	}
	
	public function isTrue(context:EZAffixContext):boolean{ 
		Debug.LogError("no func");
		var dot:boolean = true;//EZDotManager.instance().hasDot(dot_, magicType_, context.to);
		if(has_)
			return dot;
		return !dot;
	};
};