#pragma strict

class EZOrderCondition extends EZAffixCondition{

	private var order_:String = "Before";
	public function clone():EZAffixCondition{
		return EZOrderCondition(this);
	}
	public function EZOrderCondition(condition:EZOrderCondition){
		this.order_ = condition.order_;
	} 
	
	public function EZOrderCondition(data:JsonData.JsonPack){
		order_ = data.toString("order");
	} 
	
	
	public function getOrder(seat:EZSoul.Seat):boolean{
		// var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;  
		//// var move:boolean = soul.move;
		// if(this.order_ == "Before"){
		// 	return !move;
		// }
		// if(this.order_ == "After"){
		// 	return move;
		// }
		 return true;
	}
	public function isTrue(context:EZAffixContext):boolean{ 
		
		return getOrder(context.to);
	};
};