#pragma strict

class EZPetModel extends MonoBehaviour{
	public var _info:EZPetInfoModel;
	public var _team:EZCardTeamModel;
	public var _card:EZCardModel;
	public var _comp:EZCardCompModel;
	public var _sell:EZPetSellModel;
	
	public var _infoEnabler:EZCardViewInfoEnabler;
	public var _teamEnabler:EZCardViewTeamEnabler;
	public var _compEnabler:EZCardViewCompEnabler;
	public var _sellEnabler:EZCardViewSellEnabler;
	
	public function get infoEnabler():EZCardViewInfoEnabler{
		return _infoEnabler;
	}
	
	public function get sellEnabler():EZCardViewSellEnabler{
		return _sellEnabler;
	}
	
	
	public function get compEnabler():EZCardViewCompEnabler{
		return _compEnabler;
	}
	
	public function get teamEnabler():EZCardViewTeamEnabler{
		return _teamEnabler;
	}
	
	
	public function get sell():EZPetSellModel{
		return _sell;
	}
	public function get comp():EZCardCompModel{
		return _comp;
	}
	
	public function get info():EZPetInfoModel{
		return _info;
	}
	public function get team():EZCardTeamModel{
		return _team;
	}
	
	public function get card():EZCardModel{
		return _card;
	}
	
	public function sellOnlyOne():boolean{
		var cardsTypeArray:int[] = _card.typeArray();
		var sellTypeArray:int[] = _sell.typeArray();
		for(var i:int = 0;i<cardsTypeArray.length;++i){
			if(sellTypeArray[i] >= cardsTypeArray[i] && cardsTypeArray[i] != 0){
				return true;
			}
		}
		return false;
	}
	
	public function compOnlyOne():boolean{
		var cardsTypeArray:int[] = _card.typeArray();
		var compTypeArray:int[] = _comp.typeArray();
		for(var i:int = 0;i<cardsTypeArray.length;++i){
			if(compTypeArray[i] >= cardsTypeArray[i] && cardsTypeArray[i] != 0){
				return true;
			} 
		}
		return false;
	}
}