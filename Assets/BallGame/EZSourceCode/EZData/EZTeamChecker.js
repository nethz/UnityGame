#pragma strict

class EZTeamChecker extends MonoBehaviour{
	public var _teamTable:EZTeamTable = null;
	public var _bagTable:EZBagTable = null;
	public var _playerTable:EZPlayerTable = null;
	public var _setupTable:EZSetupTable = null;
	public var _lv:String = "lv";
	private static var instance_:EZTeamChecker = null;
	
	function Awake(){
		this.instance_ = this;
	}
	
	public static function GetInstance():EZTeamChecker{
		return this.instance_;
	}
	
	
	public function inTeam(card:EZCard){
		var team:JsonData.Team = _teamTable.data;
		if(card.id == team.battle){
			return true;
		}
		if(card.id == team.bag1){
			return true;
		}
		if(card.id == team.bag2){
			return true;
		}
		return false;
	
	}
	public function canSelect(card:EZCard):EZCheckerInfo{
	
		
		/*var team:JsonData.Team = _teamTable.data;
		
		var setup:JsonData.Setup = _setupTable.data;
		var player:JsonData.Player = _playerTable.data;
		var playerLv:int = setup.player.getLv(player.exp);
		
		if(card.lv <= playerLv){
			
			return new EZCheckerInfo();
		}
	
		return new EZCheckerInfo(_lv);*/
		return new EZCheckerInfo();
	}
	
	
	public function hasEmpty(){
	
		var team:JsonData.Team = _teamTable.data;
		if(!_bagTable.find(team.battle)){
			return true;
		}
		
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		
		if(guide.twoTeam){
			if(!_bagTable.find(team.bag1)){
				return true;
			}
		}
		
		if(guide.thirdTeam){
			if(!_bagTable.find(team.bag2)){
				return true;
			}
		}
		return false;
			
	}
	
	
	public function canTeam():boolean{
		if(hasEmpty()){
			var dict:Dictionary.<int, EZCard> = _bagTable.dict;
			if(dict){
				for(var kv:KeyValuePair.<int, EZCard> in dict){
					var card:EZCard = kv.Value;
					if(!inTeam(card)){
						var info:EZCheckerInfo = canSelect(card);
						if(info.result){
							return true;
						}
					}
				}
				
			}

		}
		return false;
	}
	
	

}