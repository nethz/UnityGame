#pragma strict

class EZHealthCondition extends EZAffixCondition{

	private var who_:String = "Self";
	private var compare_:String = "<";
	private var how_:float = 0.2;
	
	
	
	public function EZHealthCondition(condition:EZHealthCondition){
		compare_ = condition.compare_;
		who_ = condition.who_;
		how_ = condition.how_;
	} 
	
	public function EZHealthCondition(data:JsonData.JsonPack){
		compare_ = data.toString("compare");
		who_ = data.toString("who");
		how_ = data.toFloat("how");
	} 
	
	
	private function getSeat(context:EZAffixContext):EZSoul.Seat{
		if(who_ == "Self")
			return context.from;
		return context.to;
	
	}
	public function compare(left:float, right:float):boolean{
		 var ret:boolean = true;
		 switch(this.compare_){
		 case "==":
		 	ret = (left == right);
		 	break;	
		 case ">":
		 	ret = (left > right);
		 	break;	
		 case ">=":
		 	ret = (left >= right);
		 	break;	
		 case "<":
		 	ret = (left < right);
		 	break;	
		 case "<=":
		 	ret = (left <= right);
		 	break;	
		 case "!=":
		 	ret = (left != right);
		 	break;	
		 
		 } 
		 return ret;
	} 
	
	private function result(seat:EZSoul.Seat):boolean{
	
		var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;  
		return compare(soul.health,  soul.baseMaxHealth * how_ );
	}
	public function isTrue(context:EZAffixContext):boolean{ 
		
		return result(getSeat(context));
	};
};