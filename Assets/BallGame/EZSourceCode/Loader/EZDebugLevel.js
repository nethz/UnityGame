#pragma strict

class EZDebugLevel extends MonoBehaviour{
	public var _level:EZDebugStronghold[];
	//public var _title:String;
	//public var _setting:String;
	//public var _talk:String;
	public function getData():JsonData.LevelData{
		var level:JsonData.LevelData = new JsonData.LevelData(); 
		level.strongholds = new JsonData.Stronghold[_level.length];
		for(var i:int = 0; i<level.strongholds.Length; ++i ){
			 level.strongholds[i]= _level[i].getData(i);
		}
		Debug.Log(level);
		return level;
	}

}
