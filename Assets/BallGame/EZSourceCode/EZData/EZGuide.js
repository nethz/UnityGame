#pragma strict

class EZGuide extends MonoBehaviour{
	public var _guide:EZGuideTable = null; 
	public var _player:EZPlayerTable = null; 
	public var _quest:EZQuestBagTable = null;
	public var _message:EZMessageBagTable = null;
	public var _setup:EZSetupTable = null; 
	
	private static var instance_:EZGuide = null;
	public var _missionTable:EZMissionBagTable = null;
	class MissionCondition{
		var missions:int = 0;
		var text:String = "";
	}

	
	public var _canTeam:MissionCondition = null;
	public var _canSell:MissionCondition = null;
	public var _canEgg:MissionCondition = null;
	public var _canShop:MissionCondition = null;
	public var _canCrystal:MissionCondition = null;
	public var _doMagic:int = 15;
	public var _doSwap:int = 15;
	public var _twoTeam:MissionCondition = null;
	public var _thirdTeam:MissionCondition = null;
	
	function Awake(){
		this.instance_ = this;
	}
	public static function GetInstance():EZGuide{
		return this.instance_;
	}
	public function doQuest(){
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(_guide.data.quest){
			return false;
		}
		
		
		var questBag:JsonData.QuestBag = _quest.bag;
		
		
		if(questBag.empty()){
			return false;
		}
		return true;
	}
	public function doQuestMessage(){
	
		
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(_guide.data.questMessage){
			return false;
		}
		
		var quests:JsonData.Message[] =_message.quest;
		if(quests != null && quests.Length != 0){
			return true;
		}
		return false;
		
	}
	public function doComp(){
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(_guide.data.comp){
			return false;
		}
		
		
		if(!EZCompChecker.GetInstance().canComp()){
			return false;
		}
		
		
		
		
		return true;
	}
	public function doTeam(){
		
		var team:EZTeamChecker = EZTeamChecker.GetInstance();
		return team.canTeam();
	}
	public function account():List.<String>{
	
		var list:List.<String> = new List.<String>();
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		var count:int = _missionTable.GetNormalCount();
		if(!guide.canTeam){
			if(count >= _canTeam.missions){
				guide.canTeam = true;
				list.Add(_canTeam.text);
			}
		}
		
		
		
		if(!guide.canSell){
			if(count >= _canSell.missions){
				guide.canSell = true;
				list.Add(_canSell	.text);
			}
		}
		
		
		
		if(!guide.canEgg){
			if(count >= _canEgg.missions){
				guide.canEgg = true;
				list.Add(_canEgg.text);
			}
		}
		
		
		
		
		if(!guide.twoTeam){
			if(count >= _twoTeam.missions){
				guide.twoTeam = true;
				list.Add(_twoTeam.text);
			}
		}
		
		if(!guide.thirdTeam){
			if(count >= _thirdTeam.missions){
				guide.thirdTeam = true;
				list.Add(_thirdTeam.text);
			}
		}
		
			
		if(!guide.canCrystal){
			if(count >= _canCrystal.missions){
				guide.canCrystal = true;
				list.Add(_canCrystal.text);
			}
		}
		
		if(!guide.canShop){
			if(count >= _canShop.missions){
				guide.canShop = true;
				
				list.Add(_canShop.text);
			}
		}
		
		if(!guide.magic){
			if(count >= _doMagic){
				guide.magic = true;
			}
		
		}
		
		if(!guide.swap){
			if(count >= _doSwap){
				guide.swap = true;
			}
		
		}
		
		
		EZGuideTable.GetInstance().save(guide);
		return list;
	}
	
	
}