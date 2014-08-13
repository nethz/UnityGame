#pragma strict

class EZDebugLoader extends EZLoader{
	var _hero:EZDebugHero;
	var _level:EZDebugLevel;
	var _doc:EZDebugLevelDoc;
	var _crystal:EZDebugCrystal;
	var _harvest:EZDebugReward;
	
	private var levelData_:JsonData.LevelData = null;
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
	//public function loadSetup():JsonData.Setup{
//		return _harvest.getSetup();//
	//}
}