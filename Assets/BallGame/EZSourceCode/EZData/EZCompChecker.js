#pragma strict

class EZCompChecker extends MonoBehaviour{
	
	private static var instance_:EZCompChecker = null;
	public var _bagTable:EZBagTable;
	public var _setupTable:EZSetupTable;
	public var _teamTable:EZTeamTable;
	public var _playerTable:EZPlayerTable;
	public var _cantMain:String = "!canMain";
	public var _noAffix:String = "noAffix";
	public var _mark:String = "_mark";
	public var _locked:String = "_userLock";
	public var _self:String = "_self";
	public var _inTeam:String = "_inTeam";
	
	function Awake(){
		this.instance_ = this;
	}
	
	public static function GetInstance():EZCompChecker{
		return this.instance_;
	}
	
	public function canMain(main:EZCard):EZCheckerInfo{
		
		var setup:JsonData.Setup = _setupTable.data;
		var player:JsonData.Player = _playerTable.data;
		var playerLv:int = setup.player.getLv(player.exp);
		
		if(main.lv < playerLv){
			return new EZCheckerInfo();
		}
		for(var i:int = 0; i<6; ++i){
			if(i == 2){
				continue;
			}
			var info:EZAffixInfo = main.getAffix(i);
			if(info.lv < setup.affix.getAffixMaxLv(i, main.lv)){
				return new EZCheckerInfo();
			}
		}
		return new EZCheckerInfo(_cantMain);
	
		
	}
	
	public function canMaterial(main:EZCard, material:EZCard):EZCheckerInfo{
	
		var team:JsonData.Team = _teamTable.data;
		var setup:JsonData.Setup = _setupTable.data;
		var player:JsonData.Player = _playerTable.data;
		var playerLv:int = setup.player.getLv(player.exp);
		if(main.id == material.id){
			return EZCheckerInfo(_self);
		}
		if(team.find(material.id)){
			return EZCheckerInfo(_inTeam);
		}
		/*if(material.mark != EZCard.Mark.No){
			return EZCheckerInfo(_mark);
		}*/
		if(material.userLocked == EZCard.UserLocked.locked){
			return EZCheckerInfo(_locked);
		}
		if(main.lv < playerLv){
			return new EZCheckerInfo();
		}
		

		
		
		for(var i:int = 0; i<2; ++i){
			var mainSkill:EZAffixInfo = main.getAffix(i);
			if(mainSkill.lv < setup.affix.getAffixMaxLv(i, main.lv)){
				for(var j:int = 0; j<2; ++j){
					var materialSkill:EZAffixInfo = material.getAffix(j);
					if(mainSkill.title == materialSkill.title){
						return new EZCheckerInfo();
					}
				}
			}
			
		}
		
		
		
		for(var m:int = 3; m< 6; ++m){
			var mainMagic:EZAffixInfo = main.getAffix(m);
			if(mainMagic.lv < setup.affix.getAffixMaxLv(m, main.lv)){
				for(var n:int = 3; n< 6; ++n){
					var materialMagic:EZAffixInfo = material.getAffix(n);
					if(mainMagic.title == materialMagic.title){
						return new EZCheckerInfo();
					}
				}
			}
		}
		
		return EZCheckerInfo(_noAffix);
	}

	public function canComp(){
		var dict:Dictionary.<int, EZCard> = _bagTable.dict;
		if(dict != null){
		
			for(var kv:KeyValuePair.<int, EZCard> in dict){
				var main = kv.Value as EZCard; 
				var mainInfo:EZCheckerInfo = canMain(main);
				if(mainInfo.result){
					for(var kv2:KeyValuePair.<int, EZCard> in dict){
						var material:EZCard = kv2.Value as EZCard; 
						var materialInfo:EZCheckerInfo = canMaterial(main, material);
						if(materialInfo.result){
							return true;
						}
					}
				
				}
				
			}
			
			
		}
		return false;
	}
	
	
}