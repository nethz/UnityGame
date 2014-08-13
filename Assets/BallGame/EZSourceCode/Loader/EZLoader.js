#pragma strict

class EZLoader extends MonoBehaviour{
	public var _setupJson:String = "";
	public function startTask():Task{
		
		return new Task();
	}
	public function finishTask():Task{
		return new Task();
	}
	public function loadHero():JsonData.Hero{
		return null;
	}
	public function loadLevel():JsonData.LevelData {
		return null;
	}
	public function setup():JsonData.Setup{
		var setup:JsonData.Setup = null;
		if(!String.IsNullOrEmpty(_setupJson)){
			setup = JsonData.Setup.Load(_setupJson);
		}
		return setup;
	}

	public function loadCrystal():JsonData.CrystalTech {
		return null;
	}

	public function loadHarvest():JsonData.Harvest{
		return null;
	}
	public function loadPlayer():JsonData.Player{
		return null;
	}
	
	//public function loadSetup():JsonData.Setup{
	//	return null;
	//}
	
	public function loadDoc():JsonData.LevelDoc{
		return null;
	}
	
	
}