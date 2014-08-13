#pragma strict

class EZCardViewSellEnabler extends EZCardViewEnabler{

	public var _model:EZPetSellModel = null;
	//public function set model(value:EZPetSellModel){
	//	this.model_ = value;
	//}
	public var _mark:String = "mark";
	public var _locked:String = "locked";
	public var _seat:String = "seat";
	public var _full:String = "full";
	
	
	public function getEnable(card:EZCardViewInfo, data:EZCard):EZCheckerInfo{
		
		
		if(card.mainSelected || card.selected){
			return new EZCheckerInfo();
		/*}else if(card.mark != EZCard.Mark.No){
			return new EZCheckerInfo(_mark);*/
		}else if(card.seat != EZSoul.Seat.None){
			return new EZCheckerInfo(_seat);
		}else if(card.userLocked == EZCard.UserLocked.locked){
			return EZCheckerInfo(_locked);
		}else if(_model.full()){
			return new EZCheckerInfo(_full);
		}
		
		return new EZCheckerInfo();
	}
	
	
}