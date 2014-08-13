#pragma strict

class EZDebugLevelDoc extends MonoBehaviour{
	
	public var _wave:EZDebugWaveDoc[];
	public var _talk:String;
	public var _talks:String[];
	public var _info:String;
	public var _title:String;
	public var _scene:String;
	public function getData(data:JsonData.LevelData):JsonData.LevelDoc{
		
		
		var doc:JsonData.LevelDoc = new JsonData.LevelDoc(); 
		doc.talk = _talk;
		doc.talks = _talks;
		doc.info = _info;
		doc.scene = _scene;
		doc.title = _title;
		
		doc.wave = new JsonData.WaveDoc[data.strongholds.Length];
		for(var i:int = 0; i<doc.wave.Length; ++i ){
			 doc.wave[i]= _wave[i].getData(data.strongholds[i]);
		}
		Debug.Log(doc);
		return doc;
	}

}
