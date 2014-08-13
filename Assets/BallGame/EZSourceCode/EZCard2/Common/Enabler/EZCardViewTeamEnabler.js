#pragma strict

class EZCardViewTeamEnabler extends EZCardViewEnabler{
	
	public var _model:EZCardTeamModel = null;
	public var _selected:String = "selected";
	public var _self:String = "self";
	public var _inTeam:String = "team";
		
	public function getEnable(card:EZCardViewInfo, data:EZCard):EZCheckerInfo{
		
		var team:EZTeamChecker = EZTeamChecker.GetInstance();
		if(this._model && this._model.selected == EZSoul.Seat.None){
			return new EZCheckerInfo(_selected);
		}else if(this._model && this._model.selected == card.seat){
			return new EZCheckerInfo(_self);
		}else if(card.seat != EZSoul.Seat.None && this._model.selected != EZSoul.Seat.None &&  this._model.getSelectedCard() == null){
			return new EZCheckerInfo(_inTeam);
		}else{
			var info:EZCheckerInfo = team.canSelect(data);
		 	if(!info.result){
				return info;
			}
		}
		
		return new EZCheckerInfo();
	}
	
	
	
}