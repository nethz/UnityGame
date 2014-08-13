#pragma strict

class EZCompareCondition extends EZAffixCondition{

	private var item_:String = "Health";
	private var compare_:String = "<";
	
	public function clone():EZAffixCondition{
		var condition:EZCompareCondition = new EZCompareCondition(this);
		
		return condition;
	}
	public function EZCompareCondition(condition:EZCompareCondition){
		this.item_ = condition.item_;
		this.compare_ = condition.compare_;
	}
	public function EZCompareCondition(data:JsonData.JsonPack){
		item_ = data.toString("item");
		compare_ = data.toString("compare");
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
	
	public function getItem(seat:EZSoul.Seat):float{
		 var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;  
		 var ret:float = 0;
		 switch(this.item_){
		 	 case "Health": 
		 	 	ret = soul.healthBar;
		 	 	break;
		 
		 }
		 return ret;
	}
	public function isTrue(context:EZAffixContext):boolean{ 
		var left:float = getItem(context.from);
		var right:float = getItem(context.to);
		return this.compare(left, right);
	};
};