#pragma strict

class EZPVPDebugLoader extends EZPVPLoader{

	public var _we:EZDebugHero = null;
	public var _foe:EZDebugHero = null;
	public var _sceneName:String = "Wood";
	public var _weCrystal:EZDebugCrystal = null;
	public var _foeCrystal:EZDebugCrystal = null;
	public function get sceneName():String{
		return _sceneName;
	}
	
	public function loadWe():JsonData.Hero{
		return _we.getData();
	}
	public function loadWeCrystal():EZDebugCrystal{
		return _weCrystal;
	}
	public function foeWeCrystal():EZDebugCrystal{
		return _foeCrystal;
	}
	public function loadFoe():JsonData.Hero{
		return _foe.getData();
	
	}
	
//	var _crystal:EZDebugCrystal;
	//var _harvest:EZDebugReward;
	
	/*private var levelData_:JsonData.LevelData = null;
	public function loadHero():JsonData.Hero{
		return _hero.getData();
	}
	public function loadLevel():JsonData.LevelData{
		if(levelData_ == null){
			levelData_ = _level.getData();
		
		}
		return levelData_;
	}
	public function loadDoc():JsonData.LevelDoc{
		return _doc.getData(loadLevel());
	
	}
	public function loadCrystal():JsonData.CrystalTech {
		return _crystal.getData();
	}
	public function loadHarvest():JsonData.Harvest{
		return _harvest.getHarvest();
	}
	public function loadPlayer():JsonData.Player{
		return _harvest.getPlayer();
	}
	public function loadSetup():JsonData.Setup{
		return _harvest.getSetup();
	}*/
}